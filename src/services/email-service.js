const sender=require("../config/emailConfig");
// sender is the transport object used to send the emails
// In case of gmail as a mailing service *from* key will always have
// email id as the one set up on SMTP Server even if different email id was passed as argument
const TicketRepository=require("../repository/ticket-repository");
const repo= new TicketRepository();

const sendBasicEmail=async (mailFrom,mailTo,mailSubject,mailBody)=>{
    try {
     const response=await sender.sendMail({
            from:mailFrom,
            to:mailTo,
            subject:mailSubject,
            text:mailBody
        }); 
        // console.log( response);
    } catch (error) {
     console.log(error);   
    }
}

const fetchPendingEmails=async ()=>{
    try {
        const response= await repo.get({status:"PENDING"});
        return response;
    } catch (error) {
        console.log(error);
    }
}

const updateTicket=async (ticketId,data)=>{
    try {
        const response= await repo.update(ticketId,data);
        return response;
    } catch (error) {
        console.log(error);
    }
}

const createNotification=async(data)=>{
    try {
       const ticket= await repo.create(data);
       return ticket;
    } catch (error) {
        console.log(error);
    }
}

module.exports={
    sendBasicEmail,
    fetchPendingEmails,
    createNotification,
    updateTicket
}