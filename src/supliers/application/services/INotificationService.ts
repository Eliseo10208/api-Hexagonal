import amqplib from 'amqplib'


export interface INotificationService {
    providerChannel : amqplib.Channel | undefined;
    
    inicializar(): Promise <boolean>

    sendNotify(message : string): boolean

}