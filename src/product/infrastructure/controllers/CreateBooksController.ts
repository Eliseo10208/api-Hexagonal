import { Request,Response } from "express";
import { CreateBooksUseCase } from "../../application/MethodsBooks/CreateBooksUseCase";

export class CreateBooksController{
    constructor(readonly createBooksUseCase:CreateBooksUseCase){}
    async run (req: Request, res: Response):Promise<void> {
        const data = req.body;
        try {
            const book = await this.createBooksUseCase.run(
                data.idBooks,
                data.name,
                data.description,
                data.password
            );
            if (book)
            res.status(201).send({

                data:{
                    idBooks : book?.idBooks,
                    name: book?.name,
                    description: book?.description,
                    password : book?.password
                },
        });
        else
        res.status(204).send({
         status:"error",
         data: "no fue posible añadir el registro"
    })
        } catch (error) {
            res.status(204).send({
                status:"error",
                data:"ocurrio un error",
                messagge: error,
            })
        }
    }

}