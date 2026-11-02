<?php

namespace App\Exports;

use Illuminate\Support\Collection;
use App\Models\Consulta;
use Illuminate\Database\Eloquent\Builder; 
use Maatwebsite\Excel\Concerns\FromQuery; 
use Maatwebsite\Excel\Concerns\Exportable; 
use Maatwebsite\Excel\Concerns\WithHeadings; 
use Maatwebsite\Excel\Concerns\WithMapping;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;

class ConsultasExport implements FromQuery, WithHeadings, WithMapping, WithEvents
{

    use Exportable; 
    protected $request;
    protected $veterinarioId;

    public function __construct(Request $request, $veterinarioId) 
    { 
        $this->request = $request;
        $this->veterinarioId = $veterinarioId; 
    }

    public function query() : Builder 
    { 
        $buscarname = trim($this->request->input('buscarname') ?? '');
        $especiebus = $this->request->input('especiebus', '');
        $fechabus = trim($this->request->input('fechabus') ?? '');
        $estadobus = trim($this->request->input('estadobus') ?? '');

       return Consulta::where('veterinario_id', $this->veterinarioId)
            ->with(['mascota.cliente', 'mascota.raza.especie', 'detalles_consultas.producto'])
            ->orderBy('fecha_hora', 'asc')
            ->when($buscarname !== '', function ($query) use ($buscarname){
                $query->whereHas('mascota.cliente', function ($q) use ($buscarname){
                    $q->where('nombre', 'like', "%{$buscarname}%");
                });
            })
            ->when($this->request->filled('especiebus'), function ($query) use ($especiebus){
                $query->whereHas('mascota.raza.especie', function ($q) use ($especiebus){
                    $q->where('id', $especiebus);
                });
            })
            ->when($fechabus !== '', function ($query) use ($fechabus){
                $query->whereDate('fecha_hora', $fechabus);
            })
            ->when($estadobus !== '', function ($query) use ($estadobus){
                $query->where('estado', $estadobus);
            }); 
    }

    public function headings(): array 
    { 
        return [
            'ID Consulta',
            'Fecha y Hora',
            'Cliente',
            'Mascota',
            'Especie',
            'Peso (kg)',
            'Estado',
            'Diagnóstico',
            'Observaciones'
        ]; 
    }

    public function map($consulta): array 
    {  
        return [
            $consulta->id,
            $consulta->fecha_hora,
            $consulta->mascota->cliente->nombre ?? 'N/A',
            $consulta->mascota->nombre ?? 'N/A',
            $consulta->mascota->raza->especie->nombre ?? 'N/A',
            $consulta->peso ?? 'No registrado',
            ucfirst($consulta->estado),
            $consulta->diagnostico ?: 'Sin diagnóstico',
            $consulta->observaciones ?: 'Sin observaciones',
        ]; 
    }

    public function registerEvents(): array
    {
        return[
            AfterSheet::class => function(AfterSheet $event) {
                $sheet= $event->sheet->getDelegate();

                $totalFilas= $this->query()->count();
                $ultimaFila= $totalFilas+1;

                $sheet->getStyle('A1:I1')->applyFromArray([
                    'font' => [
                        'bold' => true,
                        'color' => ['argb' => 'FFFFFF'],
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'startColor' => ['argb' => '4F46E5'],
                    ],
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                        'vertical'   => Alignment::VERTICAL_CENTER,
                    ],
                ]);

                $sheet->getStyle("A1:I{$ultimaFila}")->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => ['argb' => 'D1D5DB'],
                        ],
                    ],
                ]);

                foreach (range('A', 'I') as $columna) {
                    $sheet->getColumnDimension($columna)->setAutoSize(true);
                }

                for ($row=2; $row<=$ultimaFila; $row++) {
                    $estado=$sheet->getCell("G{$row}")->getValue();
                    $colorFondo='';

                    if ($estado === 'Pendiente') {
                        $colorFondo = 'FEF08A';
                    }
                    if ($estado === 'Completado') {
                        $colorFondo = 'BBF7D0';
                    }
                    if ($estado === 'Cancelado') {
                        $colorFondo = 'FECACA';
                    }

                    $sheet->getStyle("A{$row}:I{$row}")->applyFromArray([
                        'fill' => [
                            'fillType' => Fill::FILL_SOLID,
                            'startColor' => ['argb' => $colorFondo],
                        ],
                    ]);
                }
            },
        ];
    }

}
