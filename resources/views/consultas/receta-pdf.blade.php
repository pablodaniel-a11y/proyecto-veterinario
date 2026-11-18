<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Receta Médica Veterinaria</title>
    <style>
        body { font-family: sans-serif; font-size: 13px; color: #333; line-height: 1.4; }
        .header { text-align: center; border-bottom: 2px solid #f97316; padding-bottom: 10px; margin-bottom: 20px; }
        .header h1 { color: #f97316; margin: 0; font-size: 22px; }
        .info-section { margin-bottom: 15px; }
        .info-section table { width: 100%; border-collapse: collapse; }
        .info-section td { padding: 4px 0; }
        .receta-box { border: 1px solid #fed7aa; background-color: #fff7ed; padding: 15px; border-radius: 8px; margin-top: 20px; }
        .firma-box { margin-top: 60px; text-align: right; }
        .linea-firma { display: inline-block; width: 250px; border-top: 1px solid #333; text-align: center; padding-top: 5px; font-size: 11px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>Veterinaria</h1>
        <p>Comprobante de Consulta y Receta Médica</p>
    </div>

    <div class="info-section">
        <table>
            <tr>
                <td><strong>Fecha:</strong> {{ \Carbon\Carbon::parse($consulta->fecha_hora)->format('d/m/Y H:i') }}</td>
                <td><strong>Veterinario:</strong> Dr/a. {{ $consulta->veterinario->user->name ?? 'N/A' }}</td>
            </tr>
            <tr>
                <td><strong>Cliente:</strong> {{ $consulta->mascota->cliente->nombre ?? 'N/A' }}</td>
                <td><strong>Mascota:</strong> {{ $consulta->mascota->nombre ?? 'N/A' }} ({{ $consulta->mascota->raza->nombre ?? 'N/A' }})</td>
            </tr>
            <tr>
                <td colspan="2"><strong>Diagnóstico:</strong> {{ $consulta->diagnostico }}</td>
            </tr>
        </table>
    </div>

    <h3>Prescripción / Productos Recetados:</h3>
    <ul>
        @foreach($consulta->detalles_consultas as $detalle)
            <li>
                <strong>{{ $detalle->producto->nombre_producto ?? $detalle->nombre_medicamento }}</strong> - Cantidad: {{ $detalle->cantidad }}
                <br><small>Dosis: {{ $detalle->dosis }} | Indicaciones: {{ $detalle->indicaciones ?? 'Ninguna' }}</small>
            </li>
        @endforeach
    </ul>

    <div class="firma-box">
        <div class="linea-firma">
            Firma y Sello del Profesional<br>
            Matrícula N°: _________
        </div>
    </div>
</body>
</html>