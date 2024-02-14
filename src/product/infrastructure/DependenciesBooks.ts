import { CreateBooksUseCase } from "../application/MethodsBooks/CreateBooksUseCase";
import { GetAllBooksUseCase } from "../application/MethodsBooks/GetAllBooksUseCase";
import { CreateBooksController } from "./controllers/CreateBooksController";
import { GetAllBooksController } from "./controllers/GetAllBooksController";
import { EncryptService } from "./helpers/EncryptService";
import { MysqlBooksRepository } from "./repository/MysqlBooksRepository";

export const mysqlBooksRepository = new MysqlBooksRepository();
const encryptService =  new EncryptService()
export const createBooksUseCase = new CreateBooksUseCase(
  mysqlBooksRepository,encryptService
);

export const getAllUseCase = new GetAllBooksUseCase(mysqlBooksRepository);

export const createBooksController = new CreateBooksController(
  createBooksUseCase
);

export const getAllBooksController = new GetAllBooksController(
  getAllUseCase
);
