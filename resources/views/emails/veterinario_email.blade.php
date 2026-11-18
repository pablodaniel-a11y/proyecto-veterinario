@extends('emails.layout') 

@section('content')
    <p style="margin-top: 0; margin-bottom: 20px; font-size: 17px; color: #0f172a;"> 
        ¡Bienvenido al equipo, <strong>Dr./Dra. {{ $data['name'] }}</strong>!
    </p>

    <p style="margin-top: 0; margin-bottom: 20px; color: #475569; line-height: 1.5;"> 
        Se ha creado exitosamente tu cuenta de acceso para el sistema de la veterinaria. A partir de ahora podrás gestionar tus pacientes, consultas y agendas asignadas.
    </p>

    <p style="margin-top: 0; margin-bottom: 12px; font-weight: bold; color: #1e293b; font-size: 15px;"> 
        Tus credenciales de acceso temporal son: 
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff7ed; border-radius: 6px; margin-bottom: 24px; border: 1px solid #ffedd5;"> 
        <tr> 
            <td style="padding: 16px 20px; border-bottom: 1px solid #ffedd5;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #9a3412; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Correo electrónico</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['email'] }}</p> 
            </td> 
        </tr>
        <tr> 
            <td style="padding: 16px 20px;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #9a3412; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Contraseña temporal</p> 
                <p style="margin: 0; font-size: 16px; color: #c2410c; font-weight: bold; font-family: monospace; letter-spacing: 1px;">{{ $data['password'] }}</p> 
            </td> 
        </tr> 
    </table> 

    <p style="margin-top: 0; margin-bottom: 24px; color: #475569; font-size: 15px; line-height: 1.5;"> 
        Te recomendamos iniciar sesión en el sistema y cambiar tu contraseña lo antes posible por razones de seguridad. 
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #eff6ff; border-left: 4px solid #3b82f6; border-radius: 4px; margin-bottom: 0;"> 
        <tr> 
            <td style="padding: 16px;"> 
                <p style="margin: 0; color: #1e40af; font-size: 14px; font-weight: 500;"> 
                    <strong>Consejo de seguridad:</strong> Nunca compartas tus credenciales temporales con terceros. El equipo administrativo no te pedirá tu contraseña. 
                </p> 
            </td> 
        </tr>
    </table> 
@endsection