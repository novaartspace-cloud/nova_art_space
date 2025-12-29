import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phone, message } = body;

    // Validate required fields
    if (!email || !message) {
      return NextResponse.json(
        { error: 'Имейл и съобщение са задължителни' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Невалиден имейл адрес' },
        { status: 400 }
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'avoex.contact@gmail.com';

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'nOva art space <onboarding@resend.dev>', // You'll need to verify your domain with Resend
      to: [contactEmail],
      subject: 'Ново запитване от nOva art space',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #495464;">Ново запитване от уебсайта</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Имейл:</strong> ${email}</p>
            ${phone ? `<p><strong>Телефон:</strong> ${phone}</p>` : ''}
            <p><strong>Съобщение:</strong></p>
            <p style="white-space: pre-wrap; background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px; margin-top: 20px;">
            Това съобщение е изпратено от формата за контакт на nOva art space.
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Грешка при изпращане на съобщението. Моля опитайте отново.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Съобщението е изпратено успешно!' 
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Вътрешна грешка. Моля опитайте отново.' },
      { status: 500 }
    );
  }
}






