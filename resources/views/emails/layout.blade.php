<!DOCTYPE html> 
<html lang="es"> 
<head> 
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Notificación - Veterinaria Chiquititos</title> 
</head> 
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; width: 100% !important;"> 
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 10px;"> 
        <tr> 
            <td align="center"> 
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #fed7aa;"> 
                    <tr> 
                        <td style="background-color: #ffedd5; padding: 24px; text-align: center; border-bottom: 1px solid #fed7aa;"> 
                            <h2 style="margin: 0; color: #c2410c; font-size: 20px; font-weight: 600; letter-spacing: 0.5px;">Veterinaria Chiquititos</h2> 
                        </td> 
                    </tr>
                    <tr> 
                        <td style="padding: 32px; color: #334155; font-size: 16px; line-height: 1.6;"> 
                            @yield('content') 
                        </td> 
                    </tr> 
                    <tr> 
                        <td style="background-color: #f1f5f9; padding: 16px 32px; text-align: center; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 13px;"> 
                            Este es un correo automático de la veterinaria, por favor no respondas a este mensaje. 
                        </td> 
                    </tr> 
                </table> 
            </td> 
        </tr> 
    </table> 
</body> 
</html>