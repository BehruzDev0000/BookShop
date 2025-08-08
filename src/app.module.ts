import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { BorrowingsModule } from './borrowings/borrowings.module';

import { Book } from './books/entities/book.entity';
import { User } from './users/entities/user.entity';
import { Borrowing } from './borrowings/entities/borrowing.entity';
import { Author } from './authors/entities/author.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      logging: false,
      synchronize: true,
      autoLoadModels: true,
      models: [User, Book, Author, Borrowing],
    }),

    UsersModule,
    BooksModule,
    AuthorsModule,
    BorrowingsModule,
  ],
})
export class AppModule {}
