@extends('emails.layout') 

@section('content')
    <p style="margin-top: 0; margin-bottom: 20px; font-size: 17px; color: #0f172a;"> 
        ¡Hola, <strong>{{ $data['cliente_nombre'] }}</strong>!
    </p>

    <p style="margin-top: 0; margin-bottom: 24px; color: #475569;"> 
        Tu cita en la veterinaria ha sido registrada y confirmada con éxito. Aquí tienes los detalles: 
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fff7ed; border-radius: 6px; margin-bottom: 24px; border: 1px solid #ffedd5;"> 
        <tr> 
            <td style="padding: 16px 20px; border-bottom: 1px solid #ffedd5;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #9a3412; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Mascota (Paciente)</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['mascota_nombre'] }}</p> 
            </td> 
        </tr>
        <tr> 
            <td style="padding: 16px 20px; border-bottom: 1px solid #ffedd5;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #9a3412; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Veterinario Asignado</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">Dr./Dra. {{ $data['veterinario_nombre'] }}</p> 
            </td> 
        </tr>
        <tr> 
            <td style="padding: 16px 20px; border-bottom: 1px solid #ffedd5;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #9a3412; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Fecha y Hora</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['fecha_hora'] }}</p> 
            </td> 
        </tr>
        <tr> 
            <td style="padding: 16px 20px;"> 
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #9a3412; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Motivo de la consulta</p> 
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['motivo'] }}</p> 
            </td> 
        </tr> 
    </table> 

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border-left: 4px solid #ef4444; border-radius: 4px; margin-bottom: 0;"> 
        <tr> 
            <td style="padding: 16px;"> 
                <p style="margin: 0; color: #991b1b; font-size: 14px; font-weight: 500;"> 
                    ⚠ <strong>Importante:</strong> Si necesitas cancelar o reprogramar tu turno, por favor comunícate con nosotros con anticipación. 
                </p> 
            </td> 
        </tr>
    </table> 
@endsection