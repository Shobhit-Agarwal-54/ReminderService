const express=require("express");
const bodyParser=require("body-parser");
const {PORT}=require("./config/serverConfig");
const {createChannel,subscribeMessage}=require("./utils/messageQueue");
const {REMINDER_BINDING_KEY}=require("./config/serverConfig");
// const {sendBasicEmail}=require("./services/email-service");
const jobs=require("./utils/jobs");
const TicketController=require("./controller/ticket-controller");
const TicketService=require("./services/email-service");

const setupAndStartServer=async ()=>{
    const app=express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    const channel=await createChannel();
    // The channel object of the publisher and the subscriber should have the same
    // name of the Exchange distributor and the queue.
    subscribeMessage(channel,TicketService.subscribeEvents,REMINDER_BINDING_KEY);

    app.post("/api/v1/tickets",TicketController.create);

    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
        jobs();
    });
    
}
setupAndStartServer();


// sendBasicEmail(
// "support@admin.com",
// "somnathagarwal696@gmail.com",
// "This is a testing and system generated email",
// "Hey, how are you? I hope you are doing fine in life"
// );