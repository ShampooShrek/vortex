import Queue from "bull"
import Mailer from "nodemailer"

export const sendEmailQueue = new Queue("sendEmail")

type sendEmailQueueTypes = {
  email: string
  code: string
}

sendEmailQueue.process("send", async (job: Queue.Job<sendEmailQueueTypes>) => {
  const { email, code } = job.data;
  const transporter = Mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "luizgsiewerdt@gmail.com",
      pass: process.env.EMAIL_CODE
    }
  });

  try {
    await transporter.sendMail({
      from: "VORTEX GAMES <luizgsiewerdt@gmail.com>",
      to: email,
      subject: "Confirmação dsdsde Cadastro",
      text: `
        CÓDIGO DE VERIFICAÇÃO
        ${code}
      `
    });
  } catch (error) {
    throw error;
  }
});

type RecoverPasswordEmailTypes = {
  email: string
  key: string
}

sendEmailQueue.process("recover_password", async (job: Queue.Job<RecoverPasswordEmailTypes>) => {
  const { email, key } = job.data
  const transporter = Mailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "luizgsiewerdt@gmail.com",
      pass: process.env.EMAIL_CODE
    }
  })

  try {
    await transporter.sendMail({
      from: "VORTEX GAMES <luizgsiewerdt@gmail.com>",
      to: email,
      subject: "Atualizar Senha",
      text: `
        <h1>Clique aqui para ser redirecionado para o formulário</h1>
        <a href="http://localhost:3000/auth/update_password?key=${key}">http://localhost:3000/auth/update_password?key=${key}</a>
      `
    })
  } catch (error) {
    return;
  }
})
