@extends('emails.layout') 

@section('content')
    <p style="margin-top: 0; margin-bottom: 20px; font-size: 17px; color: #0f172a;"> 
        ¡Hola, <strong>{{ $data['cliente_nombre'] }}</strong>!
    </p>

    <p style="margin-top: 0; margin-bottom: 20px; color: #475569;"> 
        Hemos recibido tu solicitud de cita en la veterinaria. Actualmente se encuentra con estado:
    </p>

    <div style="margin-bottom: 24px;">
        <span style="background-color: #fef3c7; color: #b45309; padding: 6px 14px; border-radius: 6px; font-weight: bold; font-size: 14px; display: inline-block; border: 1px solid #fde68a;">
            Pendiente de Confirmación
        </span>
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fffbeb; border-radius: 6px; margin-bottom: 24px; border: 1px solid #fef3c7;"> 
        <tr> 
            <td style="padding: 16px 20px; border-bottom: 1px solid #fef3c7;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #b45309; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Mascota (Paciente)</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['mascota_nombre'] }}</p> 
            </td> 
        </tr>
        <tr> 
            <td style="padding: 16px 20px; border-bottom: 1px solid #fef3c7;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #b45309; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Veterinario Solicitado</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">Dr./Dra. {{ $data['veterinario_nombre'] }}</p> 
            </td> 
        </tr>
        <tr> 
            <td style="padding: 16px 20px; border-bottom: 1px solid #fef3c7;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #b45309; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Fecha y Hora Tentativa</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['fecha_hora'] }}</p> 
            </td> 
        </tr>
        <tr> 
            <td style="padding: 16px 20px;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #b45309; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Motivo</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['motivo'] }}</p> 
            </td> 
        </tr> 
    </table> 

    <p style="margin-top: 0; margin-bottom: 24px; color: #475569; font-size: 15px; line-height: 1.5;"> 
        Nuestro equipo evaluará la disponibilidad y te enviaremos otro correo electrónico tan pronto como la cita esté formalmente confirmada. 
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border-left: 4px solid #64748b; border-radius: 4px; margin-bottom: 0;"> 
        <tr> 
            <td style="padding: 16px;"> 
                <p style="margin: 0; color: #334155; font-size: 14px; font-weight: 500;"> 
                    !<strong>Aviso:</strong> Este correo es solo un acuse de recibo de tu solicitud y no garantiza el turno definitivo hasta su aprobación. 
                </p> 
            </td> 
        </tr>
    </table> 
@endsection