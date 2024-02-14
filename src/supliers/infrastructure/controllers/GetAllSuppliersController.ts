import { Request, Response } from "express";

import { GetAllSupplierUseCase } from "../../application/MethodsSupplier/GetAllSupplierUseCase";

export class GetAllSupplierController {
  constructor(readonly getAllSupplierUseCase: GetAllSupplierUseCase) {}

  async run(req: Request, res: Response):Promise<void> {
    try {
      const supplier = await this.getAllSupplierUseCase.run();
      console.log(supplier);
      if (supplier)
        res.status(200).send({
          status: "success",
          data: supplier.map((supplier: any) => {
            return {
              idSupplier : supplier.idSupplier,
              name: supplier.name
            };
          }),
        });
      else
        res.status(400).send({
          status: "error",
          msn: "Hubo un problema",
        });
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Hubo un problema",
        msn: error,
      });
    }
  }
}
