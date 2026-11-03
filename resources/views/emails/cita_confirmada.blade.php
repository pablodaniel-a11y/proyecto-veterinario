<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style> 
        body { font-family: Arial, sans-serif; color: #333 }
    </style>
    <title>Confirmación de Cita</title>
</head>
<body>
    <h2>¡Hola, {{ $data['cliente_nombre'] }}!</h2>
    <p>Tu cita en la veterinaria ha sido registrada y confirmada con éxito.</p>
    <p><strong>Detalles de la cita:</strong></p>
    <ul>
        <li><strong>Mascota:</strong> {{ $data['mascota_nombre'] }}</li>
        <li><strong>Veterinario asignado:</strong> Dr./Dra {{ $data['veterinario_nombre'] }}</li>
        <li><strong>Fecha y hora:</strong> {{ $data['fecha_hora'] }}</li>
        <li><strong>Motivo:</strong> {{ $data['motivo'] }}</li>
    </ul>
    <p>¡Te esperamos!</p>
    <br>
    <p>Atentamente,<br>Sistema de Veterinaria</p>
</body>
</html>