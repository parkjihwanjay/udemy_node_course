const sgMail = require('@sendgrid/mail');


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to : email,
    from : 'cc6656@naver.com',
    subject : '가입해주셔서 감사합니다.',
    text : `Welcome to the app. ${name}님`
  })
}

const sendCancelEmail = (email, name) => {
  sgMail.send({
    to : email,
    from : 'cc6656@naver.com',
    subject : '그 동안 이용해주셔서 감사합니다.',
    text : `왜 나가려고 하시나요 ${name}님?`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelEmail,
}