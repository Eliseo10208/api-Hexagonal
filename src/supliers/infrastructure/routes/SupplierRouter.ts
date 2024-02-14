import express from "express";
import { createSupplierController,  getAllSupplierController, deleteSuppliersController } from "../DependenciesSuppliers";


export const supplierRouter = express.Router();

supplierRouter.get(
  "/",
  getAllSupplierController.run.bind(getAllSupplierController)
);

supplierRouter.post(
  "/",
  createSupplierController.run.bind(createSupplierController)
);
supplierRouter.delete(
  "/:idSupplier",
  deleteSuppliersController.run.bind(deleteSuppliersController)
);