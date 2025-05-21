import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hishamraid0@gmail.com",
    pass: "zggq kbze vxrv zmux",
  },
});

export async function sendRestEmail(person, token) {
  const mailOptions = {
    from: "hishamraid0@gmail.com",
    to: `${person}`,
    subject: "Reset your password",
    html: `<p>Password Reset Code : ${token}</p>`,
  };

  return mailer.sendMail(mailOptions);
}
