<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <style> 
        body { font-family: Arial, sans-serif; color: #333 }
    </style>
    <title>Cuenta de Veterinario Creada</title>
</head>
<body>
    <h2>¡Bienvenido al equipo, Dr./Dra {{ $data['name'] }}!</h2>
    <p>Se ha creado tu cuenta de acceso para el sistema de la veterinaria.</p>
    <p>Tus credenciales de acceso temporal son:</p>
    <ul>
        <li><strong>Correo electronico:</strong> {{ $data['email'] }}</li>
        <li><strong>Contraseña temporal:</strong> {{ $data['password'] }}</li>
    </ul>
    <p>Te recomendamos iniciar sesión y cambiar tu contraseña lo antes posible.</p>
    <br>
    <p>Atentamente,<br>Administración - Sistema Veterinaria</p>
</body>
</html>