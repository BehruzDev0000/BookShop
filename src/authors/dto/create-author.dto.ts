import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
    @IsNotEmpty({ message: 'Author name cannot be empty' })
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    bio?: string;
}