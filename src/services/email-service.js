const sender=require("../config/emailConfig");
// sender is the transport object used to send the emails
// In case of gmail as a mailing service *from* key will always have
// email id as the one set up on SMTP Server even if different email id was passed as argument

const sendBasicEmail=async (mailFrom,mailTo,mailSubject,mailBody)=>{
    try {
     const response=await sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        }); 
        console.log( response);
    } catch (error) {
     console.log(error);   
    }
}

module.exports={
    sendBasicEmail
}