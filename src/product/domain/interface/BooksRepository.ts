import { Books } from "../entities/Books";

export interface BooksRepository {
    getAll():Promise<Books[] | null>;
    createBook(
        idBooks : number,
        name :string,
        description : string,
        password: string
    ):Promise<Books | null>
}