import { INotificationService } from "../../application/services/INotificationService";
import amqp from 'amqplib';

const url =  process.env.CLOUDAMQP_URL;

export class NotificationHelpers implements INotificationService{
    providerChannel: amqp.Channel | undefined;

 
    async inicializar() {
        if(!url) return false
        try {
            const connection = await amqp.connect(url)
            this.providerChannel=  await connection.createChannel()
            this.providerChannel.assertQueue("channel1")

            return true;
        } catch (error) {
            console.log(error)
            return false;
        }
    }
    sendNotify(message: string): boolean {
        if(this.providerChannel == undefined){
            return false;
        }
        this.providerChannel.sendToQueue("channel1",Buffer.from(message))
        return true;
    }
}
