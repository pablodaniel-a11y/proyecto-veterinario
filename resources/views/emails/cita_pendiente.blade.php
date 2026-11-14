<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style> 
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .badge { background-color: #fff3cd; color: #856404; padding: 6px 12px; border-radius: 4px; font-weight: bold; display: inline-block; margin-bottom: 15px; }
    </style>
    <title>Solicitud de Cita Recibida</title>
</head>
<body>
    <div class="container">
        <h2>¡Hola, {{ $data['cliente_nombre'] }}!</h2>
        <p>Hemos recibido tu solicitud de cita en la veterinaria. Actualmente se encuentra <span class="badge">Pendiente de confirmación</span> por parte de nuestro equipo.</p>
        
        <p><strong>Resumen de tu solicitud:</strong></p>
        <ul>
            <li><strong>Mascota:</strong> {{ $data['mascota_nombre'] }}</li>
            <li><strong>Veterinario solicitado:</strong> Dr./Dra {{ $data['veterinario_nombre'] }}</li>
            <li><strong>Fecha y hora tentativa:</strong> {{ $data['fecha_hora'] }}</li>
            <li><strong>Motivo:</strong> {{ $data['motivo'] }}</li>
        </ul>

        <p>En breve nos pondremos en contacto contigo o te enviaremos otro correo tan pronto como la cita esté formalmente confirmada.</p>
        
        <br><p>¡Gracias por confiar en nosotros!</p>
        <br><p>Atentamente,<br>Sistema de Veterinaria</p>
    </div>
</body>
</html>