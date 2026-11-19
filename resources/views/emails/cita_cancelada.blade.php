@extends('emails.layout')

@section('content')
    <p style="margin-top: 0; margin-bottom: 20px; font-size: 17px; color: #0f172a;">
        ¡Hola, <strong>{{ $data['cliente_nombre'] }}</strong>!
    </p>

    <p style="margin-top: 0; margin-bottom: 20px; color: #475569;">
        Te informamos que tu cita en la veterinaria ha sido <strong style="color: #b91c1c;">cancelada</strong>. Aquí tienes los detalles del turno:
    </p>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #fef2f2; border-radius: 6px; margin-bottom: 24px; border: 1px solid #fecaca;">
        <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #fecaca;">
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #991b1b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Mascota (Paciente)</p>
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['mascota_nombre'] }}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #fecaca;">
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #991b1b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Veterinario Asignado</p>
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">Dr./Dra. {{ $data['veterinario_nombre'] }}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #fecaca;">
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #991b1b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Fecha y Hora Programada</p>
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['fecha_hora'] }}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 20px; border-bottom: 1px solid #fecaca;">
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #991b1b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Motivo Original</p>
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">{{ $data['motivo'] }}</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 16px 20px;">
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #991b1b; text-transform: uppercase; font-weight: 600; letter-spacing: 0.5px;">Motivo de la Cancelación</p>
                <p style="margin: 0; font-size: 16px; color: #0f172a; font-weight: 500;">
                    {{ $data['motivo_cancelacion'] ?: 'No se especificó un motivo.' }}
                </p>
            </td>
        </tr>
    </table>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-left: 4px solid #64748b; border-radius: 4px; margin-bottom: 0;">
        <tr>
            <td style="padding: 16px;">
                <p style="margin: 0; color: #334155; font-size: 14px; font-weight: 500;">
                    Si deseas reprogramar el turno, podés comunicarte con nosotros o solicitar una nueva cita cuando lo necesites.
                </p>
            </td>
        </tr>
    </table>
@endsection