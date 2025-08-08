import { IsNotEmpty, IsString, IsUUID, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty({ message: 'Book title cannot be empty' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Author ID cannot be empty' })
    authorId: string;

    @IsOptional()
    @IsString()
    isbn?: string;

    @IsOptional()
    @IsInt({ message: 'Published year must be integer' })
    @Min(1000, { message: 'Published year must be at least 1000' })
    @Max(new Date().getFullYear(), { message: 'Published year cannot be in the future' })
    publishedYear?: number;
}