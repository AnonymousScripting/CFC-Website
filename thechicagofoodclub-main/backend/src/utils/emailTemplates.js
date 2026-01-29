// utils/emailTemplates.js
import { BACKEND_STATIC_CONTENT_URL, FRONTEND_MAIN_URL } from "./constants.js";

// export const generateMembershipEmail = ({
//   type,
//   fullName,
//   email,
//   password,
//   reason,
// }) => {
//   if (type === "approved") {
//     return {
//       subject: "Membership Request Approved 🎉",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
//           <h2 style="color: #4CAF50;">Dear ${fullName},</h2>
//           <p>Congratulations! 🎉 Your membership request has been <strong>approved</strong>.</p>
          
//           <p>Here are your login credentials:</p>
//           <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>Password:</strong> ${password}</p>
//           </div>

//           <p>You can login by clicking the button below:</p>
//           <a href="https://your-app-login-url.com" 
//              style="display: inline-block; background: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
//              Login Now
//           </a>

//           <p style="margin-top: 30px;">Welcome aboard! 🚀<br/>Best Regards,<br/><strong>Chicago Food Club Team</strong></p>
//         </div>
//       `,
//     };
//   }

//   if (type === "rejected") {
//     return {
//       subject: "Membership Request Rejected ❌",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
//           <h2 style="color: #e53935;">Dear ${fullName},</h2>
//           <p>We regret to inform you that your membership request has been <strong>rejected</strong>.</p>
          
//           ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}

//           <p>Thank you for your interest in joining us. 🙏</p>

//           <p style="margin-top: 30px;">Best Regards,<br/><strong>Chicago Food Club Team</strong></p>
//         </div>
//       `,
//     };
//   }
//   if (type === "forgotPassword") {
//     return {
//       subject: "Your New Password 🔑",
//       html: `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
//           <h2 style="color: #2196F3;">Dear ${fullName},</h2>
//           <p>We received a request to reset your password. Here are your updated login details:</p>
          
//           <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
//             <p><strong>Email:</strong> ${email}</p>
//             <p><strong>New Password:</strong> ${password}</p>
//           </div>

//           <p>You can login with your new password by clicking below:</p>
//           <a href="https://your-app-login-url.com"
//              style="display: inline-block; background: #2196F3; color: white; padding: 12px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">
//              Go to Website
//           </a>

//           <p style="margin-top: 30px;">If you didn’t request this change, please contact our support team immediately.</p>

//           <p style="margin-top: 30px;">Stay secure,<br/><strong>Chicago Food Club Team</strong></p>
//         </div>
//       `,
//     };
//   }

//   throw new Error("Invalid email type");
// };

// utils/emailTemplates.js

export const generateMembershipEmail = ({
  type,
  fullName,
  email,
  password,
  reason,
}) => {
  if (type === "approved") {
    return {
      subject: "Membership Request Approved 🎉",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Membership Approved</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Montserrat',Arial,sans-serif;line-height:1.6;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f5f5f5;">
              <tr>
                  <td style="padding:40px 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.1);overflow:hidden;">
                          
                          <!-- Header -->
                          <tr>
                              <td style="padding:60px 40px 40px;text-align:center;background:linear-gradient(135deg,#ae9364 0%,#c9a96e 100%);">
                                  <img src="${BACKEND_STATIC_CONTENT_URL}/logo.jpg" alt="Chicago Food Club" style="max-width:120px;height:auto;margin-bottom:20px;">
                                  <h1 style="color:#ffffff;font-family:'Playfair Display',serif;font-size:28px;font-weight:600;margin:0;">Membership Approved</h1>
                              </td>
                          </tr>
                          
                          <!-- Content -->
                          <tr>
                              <td style="padding:50px 40px;">
                                  <h2 style="color:#333333;font-family:'Playfair Display',serif;font-size:24px;font-weight:600;margin:0 0 20px;text-align:center;">Welcome, ${fullName}!</h2>
                                  <p style="color:#666666;font-size:16px;margin:0 0 30px;text-align:center;line-height:1.7;">
                                      Congratulations 🎉 Your membership request has been <strong>approved</strong>.<br>
                                      You can now access your account using the details below.
                                  </p>
                                  
                                  <!-- Credentials -->
                                  <div style="background-color:#d1ecf1;padding:20px;border-radius:8px;margin:30px 0;border-left:4px solid #bee5eb;">
                                      <p style="color:#0c5460;font-size:14px;margin:0;line-height:1.6;">
                                          <strong>Your Login Info:</strong><br>
                                          <b>Email:</b> <span style="color:#ae9364;">${email}</span><br>
                                          <b>Password:</b> <span style="color:#ae9364;">${password}</span>
                                      </p>
                                  </div>
                                  
                                  <!-- CTA -->
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:40px auto;">
                                      <tr>
                                          <td style="text-align:center;">
                                              <a href="${FRONTEND_MAIN_URL}/login" style="display:inline-block;background:linear-gradient(135deg,#ae9364 0%,#c9a96e 100%);color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:16px;font-weight:600;text-decoration:none;padding:16px 40px;border-radius:8px;box-shadow:0 4px 16px rgba(174,147,100,0.3);transition:all 0.3s ease;text-transform:uppercase;letter-spacing:1px;">
                                                  Login Now
                                              </a>
                                          </td>
                                      </tr>
                                  </table>
                                  
                                  <p style="color:#999999;font-size:14px;margin:30px 0 0;text-align:center;line-height:1.6;">
                                      For security, please update your password after your first login.
                                  </p>
                              </td>
                          </tr>
                          
                          <!-- Footer -->
                          <tr>
                              <td style="padding:30px 40px;background-color:#f9f7f3;border-top:1px solid #eeeeee;">
                                  <p style="color:#999999;font-size:12px;margin:0;text-align:center;line-height:1.5;">
                                      © 2025 The Chicago Food Club. All rights reserved.<br>
                                      For questions or support, contact us at info@thechicagofoodclub.com
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `,
    };
  }

  if (type === "rejected") {
    return {
      subject: "Membership Request Update ❌",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Membership Request Update</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Montserrat',Arial,sans-serif;line-height:1.6;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f5f5f5;">
              <tr>
                  <td style="padding:40px 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.1);overflow:hidden;">
                          
                          <!-- Header -->
                          <tr>
                              <td style="padding:60px 40px 40px;text-align:center;background:linear-gradient(135deg,#d9534f 0%,#c9302c 100%);">
                                  <img src="${BACKEND_STATIC_CONTENT_URL}/logo.jpg" alt="Chicago Food Club" style="max-width:120px;height:auto;margin-bottom:20px;">
                                  <h1 style="color:#ffffff;font-family:'Playfair Display',serif;font-size:28px;font-weight:600;margin:0;">Membership Request Update</h1>
                              </td>
                          </tr>
                          
                          <!-- Content -->
                          <tr>
                              <td style="padding:50px 40px;">
                                  <h2 style="color:#333333;font-family:'Playfair Display',serif;font-size:24px;font-weight:600;margin:0 0 20px;text-align:center;">Hello ${fullName},</h2>
                                  <p style="color:#666666;font-size:16px;margin:0 0 30px;text-align:center;line-height:1.7;">
                                      Thank you for your interest in joining the <strong>Chicago Food Club</strong>. 
                                      After carefully reviewing your request, we are unable to approve your membership at this time.
                                  </p>
                                  
                                  ${
                                    reason
                                      ? `<div style="background-color:#f8d7da;padding:20px;border-radius:8px;margin:30px 0;border-left:4px solid #f5c6cb;">
                                          <p style="color:#721c24;font-size:14px;margin:0;line-height:1.6;">
                                              <strong>Reason:</strong> ${reason}
                                          </p>
                                      </div>`
                                      : ""
                                  }
                                  
                                  <p style="color:#666666;font-size:16px;margin:20px 0 30px;text-align:center;line-height:1.7;">
                                      We truly appreciate the time you took to apply, and we encourage you to reapply in the future.  
                                      If you believe this was a mistake or have further questions, please reach out to our support team.
                                  </p>
                              </td>
                          </tr>
                          
                          <!-- Footer -->
                          <tr>
                              <td style="padding:30px 40px;background-color:#f9f7f3;border-top:1px solid #eeeeee;">
                                  <p style="color:#999999;font-size:12px;margin:0;text-align:center;line-height:1.5;">
                                      © 2025 The Chicago Food Club. All rights reserved.<br>
                                      For questions or support, contact us at info@thechicagofoodclub.com
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `,
    };
  }

  if (type === "forgotPassword") {
    return {
      subject: "Password Reset Request 🔑",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Montserrat',Arial,sans-serif;line-height:1.6;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f5f5f5;">
              <tr>
                  <td style="padding:40px 20px;">
                      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.1);overflow:hidden;">
                          
                          <!-- Header -->
                          <tr>
                              <td style="padding:60px 40px 40px;text-align:center;background:linear-gradient(135deg,#d9534f 0%,#c9302c 100%);">
                                  <img src="${BACKEND_STATIC_CONTENT_URL}/logo.jpg" alt="Chicago Food Club" style="max-width:120px;height:auto;margin-bottom:20px;">
                                  <h1 style="color:#ffffff;font-family:'Playfair Display',serif;font-size:28px;font-weight:600;margin:0;">Password Reset</h1>
                              </td>
                          </tr>
                          
                          <!-- Content -->
                          <tr>
                              <td style="padding:50px 40px;">
                                  <h2 style="color:#333333;font-family:'Playfair Display',serif;font-size:24px;font-weight:600;margin:0 0 20px;text-align:center;">Hello ${fullName},</h2>
                                  <p style="color:#666666;font-size:16px;margin:0 0 30px;text-align:center;line-height:1.7;">
                                      We received a request to reset your password. Here are your updated login details:
                                  </p>
                                  
                                  <!-- Credentials -->
                                  <div style="background-color:#e3f2fd;padding:20px;border-radius:8px;margin:30px 0;border-left:4px solid #90caf9;">
                                      <p style="color:#0d47a1;font-size:14px;margin:0;line-height:1.6;">
                                          <strong>Your New Login Info:</strong><br>
                                          <b>Email:</b> <span style="color:#1976D2;">${email}</span><br>
                                          <b>New Password:</b> <span style="color:#1976D2;">${password}</span>
                                      </p>
                                  </div>
                                  
                                  <!-- CTA -->
                                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:40px auto;">
                                      <tr>
                                          <td style="text-align:center;">
                                              <a href="${FRONTEND_MAIN_URL}/login" style="display:inline-block;background:linear-gradient(135deg,#2196F3 0%,#1976D2 100%);color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:16px;font-weight:600;text-decoration:none;padding:16px 40px;border-radius:8px;box-shadow:0 4px 16px rgba(25,118,210,0.3);transition:all 0.3s ease;text-transform:uppercase;letter-spacing:1px;">
                                                  Login Now
                                              </a>
                                          </td>
                                      </tr>
                                  </table>
                                  
                                  <p style="color:#999999;font-size:14px;margin:30px 0 0;text-align:center;line-height:1.6;">
                                      If you did not request this password reset, please contact our support team immediately.
                                  </p>
                              </td>
                          </tr>
                          
                          <!-- Footer -->
                          <tr>
                              <td style="padding:30px 40px;background-color:#f9f7f3;border-top:1px solid #eeeeee;">
                                  <p style="color:#999999;font-size:12px;margin:0;text-align:center;line-height:1.5;">
                                      © 2025 The Chicago Food Club. All rights reserved.<br>
                                      For questions or support, contact us at info@thechicagofoodclub.com
                                  </p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
      `,
    };
  }

  throw new Error("Invalid email type");
};

export const generatePasswordResetEmail = (fullName, resetLink) => {
  return {
    subject: "Password Reset Request",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    </head>
    <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:'Montserrat',Arial,sans-serif;line-height:1.6;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width:100%;background-color:#f5f5f5;">
            <tr>
                <td style="padding:40px 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.1);overflow:hidden;">
                        
                        <!-- Header -->
                        <tr>
                            <td style="padding:60px 40px 40px;text-align:center;background:linear-gradient(135deg,#ae9364 0%,#c9a96e 100%);">
                                <img src="${BACKEND_STATIC_CONTENT_URL}/logo.jpg" alt="Chicago Food Club" style="max-width:120px;height:auto;margin-bottom:20px;">
                                <h1 style="color:#ffffff;font-family:'Playfair Display',serif;font-size:28px;font-weight:600;margin:0;">Password Reset</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding:50px 40px;">
                                <h2 style="color:#333333;font-family:'Playfair Display',serif;font-size:24px;font-weight:600;margin:0 0 20px;text-align:center;">Hello ${fullName},</h2>
                                
                                <p style="color:#666666;font-size:16px;margin:0 0 30px;text-align:center;line-height:1.7;">
                                    We received a request to reset your password.<br>
                                    Please click the button below to set a new one.<br>
                                    This link will expire in <strong>15 minutes</strong>.
                                </p>
                                
                                <!-- CTA Button -->
                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:40px auto;">
                                    <tr>
                                        <td style="text-align:center;">
                                            <a href="${resetLink}" style="display:inline-block;background:linear-gradient(135deg,#ae9364 0%,#c9a96e 100%);color:#ffffff;font-family:'Montserrat',Arial,sans-serif;font-size:16px;font-weight:600;text-decoration:none;padding:16px 40px;border-radius:8px;box-shadow:0 4px 16px rgba(174,147,100,0.3);transition:all 0.3s ease;text-transform:uppercase;letter-spacing:1px;">
                                                Reset Password
                                            </a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="color:#999999;font-size:14px;margin:30px 0 0;text-align:center;line-height:1.6;">
                                    If the button doesn’t work, copy and paste this link into your browser:<br>
                                    <a href="${resetLink}" style="color:#ae9364;text-decoration:none;word-break:break-all;">${resetLink}</a>
                                </p>
                                
                                <p style="color:#999999;font-size:14px;margin:20px 0 0;text-align:center;">
                                    If you didn’t request a password reset, you can safely ignore this email.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding:30px 40px;background-color:#f9f7f3;border-top:1px solid #eeeeee;">
                                <p style="color:#999999;font-size:12px;margin:0;text-align:center;line-height:1.5;">
                                    © 2025 The Chicago Food Club. All rights reserved.<br>
                                    For support, contact us at info@thechicagofoodclub.com
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `,
  };
};




export const generateContactEmail = ({
  fullName,
  email,
  phone,
  interest,
  message,
}) => {
  return {
    subject: `📩 New Contact Form Submission from ${fullName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        
        <p>You have received a new inquiry from the website contact form. Here are the details:</p>
        
        <div style="background: #fff; border: 1px solid #ddd; padding: 15px; border-radius: 6px; margin-bottom: 20px;">
          <p><strong>Full Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "N/A"}</p>
          <p><strong>Interest:</strong> ${interest}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f5f5f5; padding:10px; border-radius:6px;">${message}</p>
        </div>

        <p style="margin-top: 20px; color:#555;">Please reply to this email to contact <strong>${fullName}</strong> directly.</p>

        <p style="margin-top: 30px;">Best Regards,<br/><strong>Chicago Food Club Website</strong></p>
      </div>
    `,
  };
};

// export const generateActivationEmail = ({ fullName }) => {
//   const subject = "Your Account Has Been Activated";
//   const html = `
//     <div style="font-family: sans-serif; line-height: 1.6;">
//       <h2>Hello ${fullName},</h2>
//       <p>Your account has been <strong>activated</strong>. You can now access all features of your account.</p>
//       <p>Thank you for being with us!</p>
//     </div>
//   `;
//   return { subject, html };
// };

export const generateActivationEmail = ({ fullName }) => {
  const subject = "Your Account Has Been Activated";
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Activated</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background-color: #f5f5f5;">
          <tr>
              <td style="padding: 40px 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); overflow: hidden;">
                      
                      <!-- Header -->
                      <tr>
                          <td style="padding: 60px 40px 40px; text-align: center; background: linear-gradient(135deg, #ae9364 0%, #c9a96e 100%);">
                              <img src="${BACKEND_STATIC_CONTENT_URL}/logo.jpg" alt="Your Company" style="max-width: 120px; height: auto; margin-bottom: 20px;">
                              <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; margin: 0;">Account Activated</h1>
                          </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                          <td style="padding: 50px 40px;">
                              <h2 style="color: #333333; font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 600; margin: 0 0 20px; text-align: center;">Hello ${fullName},</h2>
                              
                              <p style="color: #666666; font-size: 16px; margin: 0 0 30px; text-align: center; line-height: 1.7;">
                                  Your account has been <strong>activated</strong>. You can now access all features of your account.
                              </p>
                              
                              <p style="color: #666666; font-size: 16px; margin: 0 0 30px; text-align: center; line-height: 1.7;">
                                  Thank you for being with us!
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                          <td style="padding: 30px 40px; background-color: #f9f7f3; border-top: 1px solid #eeeeee;">
                              <p style="color: #999999; font-size: 12px; margin: 0; text-align: center; line-height: 1.5;">
                                  © 2025 Chicago Food Club. All rights reserved.<br>
                                  For support, contact us at info@thechicagofoodclub.com
                              </p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
  return { subject, html };
};

// export const generateDeactivationEmail = ({ fullName, reason }) => {
//   const subject = "Your Account Has Been Deactivated";
//   const html = `
//     <div style="font-family: sans-serif; line-height: 1.6;">
//       <h2>Hello ${fullName},</h2>
//       <p>Your account has been <strong>deactivated</strong> by the admin.</p>
//       <p><strong>Reason:</strong> ${reason}</p>
//       <p>If you have any questions, please contact support.</p>
//     </div>
//   `;
//   return { subject, html };
// };

export const generateDeactivationEmail = ({ fullName, reason }) => {
  const subject = "Your Account Has Been Deactivated";
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Account Deactivated</title>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
  </head>
  <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Montserrat', Arial, sans-serif; line-height: 1.6;">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="width: 100%; background-color: #f5f5f5;">
          <tr>
              <td style="padding: 40px 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); overflow: hidden;">
                      
                      <!-- Header -->
                      <tr>
                          <td style="padding: 60px 40px 40px; text-align: center; background: linear-gradient(135deg, #ae9364 0%, #c9a96e 100%);">
                              <img src="${BACKEND_STATIC_CONTENT_URL}/logo.jpg" alt="The Chicago Food Club" style="max-width: 120px; height: auto; margin-bottom: 20px;">
                              <h1 style="color: #ffffff; font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 600; margin: 0;">Account Deactivated</h1>
                          </td>
                      </tr>
                      
                      <!-- Content -->
                      <tr>
                          <td style="padding: 50px 40px;">
                              <h2 style="color: #333333; font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 600; margin: 0 0 20px; text-align: center;">Hello ${fullName},</h2>
                              
                              <p style="color: #666666; font-size: 16px; margin: 0 0 20px; text-align: center; line-height: 1.7;">
                                  Your account has been <strong>deactivated</strong> by the admin.
                              </p>
                              
                              <div style="background-color: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f5c6cb;">
                                  <p style="color: #721c24; font-size: 14px; margin: 0; line-height: 1.6;">
                                      <strong>Reason:</strong> ${reason}
                                  </p>
                              </div>
                              
                              <p style="color: #666666; font-size: 16px; margin: 20px 0 30px; text-align: center; line-height: 1.7;">
                                  If you have any questions, please contact support.
                              </p>
                          </td>
                      </tr>
                      
                      <!-- Footer -->
                      <tr>
                          <td style="padding: 30px 40px; background-color: #f9f7f3; border-top: 1px solid #eeeeee;">
                              <p style="color: #999999; font-size: 12px; margin: 0; text-align: center; line-height: 1.5;">
                                  © 2025 The Chicago Food Club. All rights reserved.<br>
                                  For support, contact us at info@thechicagofoodclub.com
                              </p>
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `;
  return { subject, html };
};
