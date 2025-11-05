// Notification helpers
export interface BookingConfirmation {
  email?: string;
  phone?: string;
  providerName: string;
  serviceName: string;
  bookingRef: string;
  datetime?: string;
}

/**
 * Send a booking confirmation via email and/or SMS. This is a stub implementation.
 * In production, integrate with email providers like Resend/SendGrid and SMS providers like Twilio.
 */
export async function sendBookingConfirmation(details: BookingConfirmation) {
  const { email, phone, providerName, serviceName, bookingRef } = details;
  // Log to console for now. Replace with actual email/SMS sending.
  console.log(
    `Booking confirmation for ${providerName} (${serviceName}) ref ${bookingRef} will be sent to ${email ?? phone}`
  );
  // Example: integrate with an email service
  // if (email) {
  //   await resend.emails.send({
  //     from: 'no-reply@vardly.se',
  //     to: email,
  //     subject: 'Bokningsbekräftelse',
  //     html: `<p>Tack för din bokning hos ${providerName} (${serviceName}).</p><p>Referens: ${bookingRef}</p>`,
  //   });
  // }
  // Example: integrate with an SMS service
  // if (phone) {
  //   await twilioClient.messages.create({
  //     from: process.env.TWILIO_PHONE_NUMBER || '',
  //     to: phone,
  //     body: `Bokning bekräftad hos ${providerName} (${serviceName}). Ref: ${bookingRef}`,
  //   });
  // }
}
