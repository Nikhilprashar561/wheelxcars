import { NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;
const RECIPIENT_EMAIL = process.env.CONTACT_EMAIL || "nikhilprashar56@gmail.com";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }

    const timestamp = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "medium",
    });

    let subject = "";
    let htmlContent = "";

    // 1. CAR ENQUIRY
    if (type === "car-enquiry") {
      const { name, phone, email, message, preferredContact, car } = data;
      subject = `[WheelxCars Enquiry] ${car?.brand || ""} ${car?.model || ""} — ${name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"/></head>
        <body style="margin: 0; padding: 24px; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #222222; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #000000; padding: 24px 32px; border-bottom: 1px solid #222222;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Wheel<span style="color: #888888;">x</span>Cars</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">New Vehicle Enquiry</p>
            </div>
            <div style="padding: 32px;">
              <div style="background: #181818; border: 1px solid #282828; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Vehicle of Interest</p>
                <h2 style="margin: 0 0 8px 0; font-size: 18px; color: #ffffff;">${car?.year || ""} ${car?.brand || ""} ${car?.model || ""}</h2>
                <p style="margin: 0 0 12px 0; font-size: 13px; color: #aaaaaa;">${car?.variant || ""} · ${car?.city || ""} · ₹${car?.price || ""} Lakh</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 12px; color: #cccccc;">
                  <tr>
                    <td style="padding: 4px 0; color: #888888;">Fuel:</td>
                    <td style="padding: 4px 0; font-weight: 600;">${car?.fuel || "N/A"}</td>
                    <td style="padding: 4px 0; color: #888888;">Transmission:</td>
                    <td style="padding: 4px 0; font-weight: 600;">${car?.transmission || "N/A"}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0; color: #888888;">Mileage:</td>
                    <td style="padding: 4px 0; font-weight: 600;">${car?.mileage || "N/A"}</td>
                    <td style="padding: 4px 0; color: #888888;">Reg State:</td>
                    <td style="padding: 4px 0; font-weight: 600;">${car?.registration || "N/A"}</td>
                  </tr>
                </table>
              </div>

              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin: 0 0 16px 0;">Customer Information</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #888888; width: 140px;">Name:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Phone:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;"><a href="tel:${phone}" style="color: #ffffff; text-decoration: underline;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Email:</td>
                  <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Preferred Contact:</td>
                  <td style="padding: 8px 0; color: #ffffff;">${preferredContact || "Phone / WhatsApp"}</td>
                </tr>
              </table>

              ${message ? `
                <div style="background-color: #141414; border-left: 3px solid #ffffff; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                  <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Customer Note</p>
                  <p style="margin: 0; font-size: 14px; color: #e0e0e0; line-height: 1.5;">${message}</p>
                </div>
              ` : ""}

              <div style="border-top: 1px solid #222222; padding-top: 16px; font-size: 11px; color: #666666; display: flex; justify-content: space-between;">
                <span>Received: ${timestamp}</span>
                <span>WheelxCars Marketplace · Tricity</span>
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // 2. TEST DRIVE REQUEST
    else if (type === "test-drive") {
      const { name, phone, email, preferredDate, preferredTime, message, car } = data;
      subject = `[Test Drive Request] ${car?.brand || ""} ${car?.model || ""} — ${name} (${preferredDate})`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"/></head>
        <body style="margin: 0; padding: 24px; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #222222; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #000000; padding: 24px 32px; border-bottom: 1px solid #222222;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Wheel<span style="color: #888888;">x</span>Cars</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Test Drive Appointment Request</p>
            </div>
            <div style="padding: 32px;">
              <div style="background: #181818; border: 1px solid #282828; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Vehicle Requested</p>
                <h2 style="margin: 0 0 4px 0; font-size: 18px; color: #ffffff;">${car?.year || ""} ${car?.brand || ""} ${car?.model || ""}</h2>
                <p style="margin: 0; font-size: 13px; color: #aaaaaa;">${car?.variant || ""} · ${car?.city || ""} · ₹${car?.price || ""} Lakh</p>
              </div>

              <div style="background: #000000; border: 1px solid #333333; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Requested Schedule</p>
                <p style="margin: 0; font-size: 16px; font-weight: 700; color: #ffffff;">📅 ${preferredDate} at ⏰ ${preferredTime}</p>
              </div>

              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #888888; width: 140px;">Customer Name:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Phone:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;"><a href="tel:${phone}" style="color: #ffffff; text-decoration: underline;">${phone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Email:</td>
                  <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></td>
                </tr>
              </table>

              ${message ? `
                <div style="background-color: #141414; border-left: 3px solid #ffffff; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                  <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Special Instructions</p>
                  <p style="margin: 0; font-size: 14px; color: #e0e0e0; line-height: 1.5;">${message}</p>
                </div>
              ` : ""}

              <div style="border-top: 1px solid #222222; padding-top: 16px; font-size: 11px; color: #666666;">
                Received: ${timestamp} · Location: ${car?.city || "Chandigarh Tricity"}
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // 3. SELL YOUR CAR SUBMISSION
    else if (type === "sell-car") {
      const {
        make,
        model,
        variant,
        year,
        fuelType,
        transmission,
        bodyType,
        color,
        kmDriven,
        owners,
        regState,
        regCity,
        overallCondition,
        accidentHistory,
        serviceHistory,
        insuranceStatus,
        expectedPrice,
        isNegotiable,
        sellerName,
        sellerPhone,
        sellerEmail,
        sellerCity,
        sellerLocality,
        imageCount,
      } = data;

      subject = `[New Listing Submission] ${year} ${make} ${model} — ₹${expectedPrice} (Seller: ${sellerName})`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"/></head>
        <body style="margin: 0; padding: 24px; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
          <div style="max-width: 650px; margin: 0 auto; background-color: #111111; border: 1px solid #222222; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #000000; padding: 24px 32px; border-bottom: 1px solid #222222;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Wheel<span style="color: #888888;">x</span>Cars</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Sell Car Listing Submission</p>
            </div>
            <div style="padding: 32px;">
              <div style="background: #181818; border: 1px solid #282828; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                <p style="margin: 0 0 4px 0; font-size: 11px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">Vehicle Details</p>
                <h2 style="margin: 0 0 8px 0; font-size: 20px; color: #ffffff;">${year} ${make} ${model}</h2>
                <p style="margin: 0 0 16px 0; font-size: 13px; color: #aaaaaa;">Variant: ${variant || "Not specified"} · Color: ${color || "Not specified"} · Body: ${bodyType || "N/A"}</p>
                <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #dddddd;">
                  <tr>
                    <td style="padding: 6px 0; color: #888888;">Fuel:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${fuelType}</td>
                    <td style="padding: 6px 0; color: #888888;">Transmission:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${transmission}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #888888;">KM Driven:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${kmDriven} km</td>
                    <td style="padding: 6px 0; color: #888888;">Owners:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${owners}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #888888;">Registration:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${regState || "N/A"} (${regCity || "N/A"})</td>
                    <td style="padding: 6px 0; color: #888888;">Photos Attached:</td>
                    <td style="padding: 6px 0; font-weight: 600;">${imageCount || 0} images</td>
                  </tr>
                </table>
              </div>

              <div style="background: #141414; border: 1px solid #222222; border-radius: 8px; padding: 16px; margin-bottom: 24px;">
                <p style="margin: 0 0 8px 0; font-size: 11px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Pricing & Condition</p>
                <p style="margin: 0 0 8px 0; font-size: 18px; font-weight: 700; color: #ffffff;">Expected Price: ₹${expectedPrice} Lakh ${isNegotiable ? "(Negotiable)" : "(Fixed)"}</p>
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #cccccc;"><strong>Condition:</strong> ${overallCondition}</p>
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #cccccc;"><strong>Accident History:</strong> ${accidentHistory || "None reported"}</p>
                <p style="margin: 0 0 4px 0; font-size: 13px; color: #cccccc;"><strong>Service History:</strong> ${serviceHistory || "Not specified"}</p>
                <p style="margin: 0; font-size: 13px; color: #cccccc;"><strong>Insurance:</strong> ${insuranceStatus || "Not specified"}</p>
              </div>

              <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #888888; margin: 0 0 16px 0;">Seller Information</h3>
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #888888; width: 140px;">Seller Name:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${sellerName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Phone:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;"><a href="tel:${sellerPhone}" style="color: #ffffff; text-decoration: underline;">${sellerPhone}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Email:</td>
                  <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${sellerEmail}" style="color: #ffffff; text-decoration: underline;">${sellerEmail}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Location:</td>
                  <td style="padding: 8px 0; color: #ffffff;">${sellerCity}${sellerLocality ? `, ${sellerLocality}` : ""} (Tricity)</td>
                </tr>
              </table>

              <div style="border-top: 1px solid #222222; padding-top: 16px; font-size: 11px; color: #666666;">
                Submitted: ${timestamp} · Action required: Review vehicle details and contact seller.
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // 4. GENERAL CONTACT
    else {
      const { name, email, phone, subject: userSubject, message } = data;
      subject = `[Website Contact] ${userSubject || "Enquiry"} — ${name}`;
      htmlContent = `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"/></head>
        <body style="margin: 0; padding: 24px; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #ffffff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #222222; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #000000; padding: 24px 32px; border-bottom: 1px solid #222222;">
              <h1 style="margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px;">Wheel<span style="color: #888888;">x</span>Cars</h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #888888; text-transform: uppercase; letter-spacing: 1px;">General Contact Message</p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 8px 0; color: #888888; width: 120px;">Name:</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Email:</td>
                  <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #ffffff; text-decoration: underline;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; color: #888888;">Phone:</td>
                  <td style="padding: 8px 0; color: #ffffff;"><a href="tel:${phone}" style="color: #ffffff; text-decoration: underline;">${phone}</a></td>
                </tr>` : ""}
              </table>

              <div style="background-color: #141414; border-left: 3px solid #ffffff; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
                <p style="margin: 0 0 6px 0; font-size: 11px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Message</p>
                <p style="margin: 0; font-size: 14px; color: #e0e0e0; line-height: 1.6;">${message}</p>
              </div>

              <div style="border-top: 1px solid #222222; padding-top: 16px; font-size: 11px; color: #666666;">
                Received: ${timestamp} · Sent from WheelxCars Contact Page
              </div>
            </div>
          </div>
        </body>
        </html>
      `;
    }

    // Try sending via Resend if API key is provided
    if (resend && resendApiKey) {
      const response = await resend.emails.send({
        from: "WheelxCars <onboarding@resend.dev>",
        to: RECIPIENT_EMAIL,
        subject,
        html: htmlContent,
      });
      return NextResponse.json({ success: true, id: response.data?.id, mode: "resend" });
    }

    // Graceful logging if running in dev or without Resend key
    console.log("=== [EMAIL DISPATCH SIMULATION / RECEIVED] ===");
    console.log(`To: ${RECIPIENT_EMAIL}`);
    console.log(`Subject: ${subject}`);
    console.log(`Payload:`, JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      mode: "development-logged",
      message: "Notification received and queued for dispatch.",
      recipient: RECIPIENT_EMAIL,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to process email dispatch";
    console.error("Email API error:", errMessage);
    return NextResponse.json({ error: errMessage }, { status: 500 });
  }
}
