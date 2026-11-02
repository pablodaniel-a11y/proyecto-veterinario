<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reporte de Citas</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; color: #333; }
        h1 { text-align: center; color: #e5bb46; }
        .meta-reporte { text-align: right; font-size: 11px; color: #666; margin-bottom: 15px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; }
    </style>
</head>
<body>
    <h1>Reporte de Citas Programadas</h1>
    <div class="meta-reporte">
        <p><strong>Total de citas:</strong> {{ count($citas) }}</p>
        <p><strong>Generado el:</strong> {{ \Carbon\Carbon::now()->format('d/m/Y H:i') }}</p>
    </div>
    <table>
        <thead>
            <tr>
                <th>Fecha y Hora</th>
                <th>Cliente</th>
                <th>Mascota</th>
                <th>Veterinario</th>
                <th>Estado</th>
            </tr>
        </thead>
        <tbody>
            @forelse($citas as $cita)
                <tr>
                    <td>{{ $cita->fecha_hora }}</td>
                    <td>{{ $cita->cliente->nombre ?? 'N/A' }}</td>
                    <td>{{ $cita->mascota->nombre ?? 'N/A' }}</td>
                    <td>{{ $cita->veterinario->user->name ?? 'N/A' }}</td>
                    <td>{{ ucfirst($cita->estado) }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" style="text-align: center;">No hay citas que coincidan con los filtros.</td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>