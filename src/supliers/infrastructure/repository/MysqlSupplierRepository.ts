import { query } from "../../../database/mysql";
import { Supplier } from "../../domain/entities/Supplier";
import { SupplierRepository } from "../../domain/interface/SupplierRepository";

export class MysqlSupplierRepository implements SupplierRepository{
    async getAll(): Promise<Supplier[] | null> {
        const sql = "SELECT * FROM suppliers";
        try {
            const [data]: any = await query(sql,[]);
            const dataSupplier = Object.values(JSON.parse(JSON.stringify(data)));
            return dataSupplier.map(
                (supplier :any)=>
                new Supplier(supplier.idSupplier, supplier.name)
            );
        } catch (error) {
            return null;
        }
    }
    
async createSupplier(
    idSupplier : number,
    name :string
    
):Promise<Supplier | null>{
    const sql = "INSERT INTO suppliers (idSupplier, name) VALUES (?, ?)";
    const params: any[] = [idSupplier, name];
        try {
            const [result]: any = await query(sql, params);

            return new Supplier(idSupplier, name);

        } catch (error) {
            return null;
        }
}
  async  deleteSupplier(idSupplier: number): Promise<Supplier | null> {
         const sql = 'DELETE FROM suppliers WHERE idSupplier = ?';
        const params : any[] = [idSupplier];
        try {
            const [result] :any = await query(sql, params);
            
            return result;
        } catch (error) {

            return null;
           
        }
  }
}
