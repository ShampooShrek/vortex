import Mailer from "nodemailer"
import prisma from "../libs/prisma"
import { sendEmailQueue } from "../libs/queue"

type Users = {
  name: string
  email: string
}

export const SendMails = async (users: Users[], text: string) => {
  const trasnporter = Mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "luizgsiewerdt@gmail.com",
      pass: process.env.EMAIL_CODE
    }
  })
  try {
    users.map(async user => {
      await trasnporter.sendMail({
        from: "luizgsiewerdt@gmail.com",
        to: user.email,
        subject: "DESCONTO",
        text
      })
    })
    return true
  } catch (e) {
    return false
  }

}

export const SendMail = async (email: string) => {
  try {
    const characters = 'ABCDEFGHIJ0123456789KL0123456789MNOPQRSTUVWXYZ0123456789';
    let code = '';

    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    await sendEmailQueue.add("send", { email, code })
    return code
  } catch (e) {
    return false
  }
}


export const sendConfEmail = async (userId: string, email: string) => {
  const code = await SendMail(email)

  if (code) {
    const expiresIn = new Date()
    expiresIn.setHours(expiresIn.getHours() + 1)

    await prisma.userEmailRequests.create({
      data: {
        expiresIn,
        type: "ConfEmail",
        code,
        userId: userId
      }
    }).catch(_ => false)

    return true
  } else {
    return false
  }
}
