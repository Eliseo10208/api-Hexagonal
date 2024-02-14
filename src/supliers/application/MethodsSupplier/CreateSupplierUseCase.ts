import { json } from "stream/consumers";
import { Supplier } from "../../domain/entities/Supplier";
import { SupplierRepository } from "../../domain/interface/SupplierRepository";
import { INotificationService } from "../services/INotificationService";

export class CreateSupplierUseCase{
    constructor(
        readonly supplierRepository: SupplierRepository
        ,readonly notificacion:INotificationService
    ) {}
    async run(
        idSupplier:number,
        name:string,
       
    ): Promise<Supplier | null>{
        try {
            const supplier = await this.supplierRepository.createSupplier(
                idSupplier,
                name,
                
            );
             this.notificacion.sendNotify("Se ha registrado un nuevo usuario");
            return supplier;
        } catch (error) {
            return null;
        }
    }
}