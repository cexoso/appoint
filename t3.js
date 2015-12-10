var nodemailer  = require("nodemailer");
var user = '28556193@qq.com', pass = 'suxiaomin1988';
var smtpTransport = nodemailer.createTransport("SMTP", {
      service: "QQ"
    , auth: {
        user: user,
        pass: pass
    }
  });
smtpTransport.sendMail({
    from:user,
    to: 'xiongjie@instony.com',
    subject : 'Node.JS通过SMTP协议从QQ邮箱发送邮件',
    html: '这是一封测试邮件 <br> '
}, function(err, res) {
    console.log(err, res);
});