<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Mail\Mailables\Address;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $data;
    protected $subjectLine;
    protected $viewName;

    /**
     * Create a new message instance.
     */
    public function __construct($data, $subjectLine = 'Notificación de la Veterinaria', $viewName = 'emails.generic')
    {
        $this->data = $data;
        $this->subjectLine = $subjectLine;
        $this->viewName = $viewName;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('myemail@veterinaria.com', 'Sistema de Veterinaria'), 
            subject: $this->subjectLine,
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: $this->viewName, 
            with: [ 
                'data' => $this->data, 
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
