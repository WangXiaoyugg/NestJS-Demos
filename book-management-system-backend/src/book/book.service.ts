import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entiy';
import { DbService } from 'src/db/db.service';

function randomNum() {
    return Math.floor(Math.random() * 1000000);
}

@Injectable()
export class BookService {

    @Inject()
    private dbService: DbService;
    async list(name: string) {
        const books: Book[] = await this.dbService.read();
        return name ? books.filter(book => {
            return book.name.includes(name);
        }) : books;
    }

    async findById(id: number) {
       const books:Book[] = await this.dbService.read();
       return books.find(book => book.id === id);
    }

    async create(createBookDto: CreateBookDto) {
        const books:Book[] = await this.dbService.read();
        const newBook  = new Book();
        newBook.id = randomNum();
        newBook.author = createBookDto.author;
        newBook.description = createBookDto.description;
        newBook.name = createBookDto.name;
        newBook.cover = createBookDto.cover;
        books.push(newBook);
        await this.dbService.write(books);
        return newBook;
    }

    async update(updateBookDto: UpdateBookDto){
        const books:Book[] = await this.dbService.read();
        const foundBook = books.find(book => book.id === updateBookDto.id);
        if (!foundBook) {
            throw new BadRequestException("该图书不存在");
        }

        foundBook.author = updateBookDto.author;
        foundBook.description = updateBookDto.description;
        foundBook.name = updateBookDto.name;
        foundBook.cover = updateBookDto.cover;

        await this.dbService.write(books);
        return foundBook;
    }

    async delete(id: number) {
        const books:Book[] = await this.dbService.read();
        const index = books.findIndex(book => book.id === id);
        if (index !== -1) {
            books.splice(index, 1);
            await this.dbService.write(books);
            return "删除成功"
        }
    }
}
