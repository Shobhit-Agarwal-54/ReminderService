// Setting up an email on a SMTP server
// sender is the transporter object using which we can easily send email
const {EMAIL_ID,EMAIL_PASS}=require("./serverConfig");
const nodemailer=require("nodemailer");
const sender=nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user:EMAIL_ID,
        pass:EMAIL_PASS
    }
    // Since we are using gmail as the service so we need to setup
    // app pasword for the gmail service on our google account (or email id which is getting setup on SMTP server)
});
module.exports=sender;