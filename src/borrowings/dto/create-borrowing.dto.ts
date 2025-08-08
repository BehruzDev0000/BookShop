import { IsNotEmpty, IsUUID, IsDateString, IsEnum } from 'class-validator';
import { BorrowingStatus } from '../entities/borrowing.entity';

export class CreateBorrowingDto {
  @IsNotEmpty({ message: 'User ID cannot be empty' })
  declare user_id: string;

  @IsNotEmpty({ message: 'Book ID cannot be empty' })
  declare book_id: string;

  @IsNotEmpty({ message: 'Borrow date cannot be empty' })
  @IsDateString({}, { message: 'Borrow date must be valid date' })
  declare borrow_date: string;

  @IsEnum(BorrowingStatus, {
    message: `Status quyidagilardan biri bo'lishi kerak: ${Object.values(BorrowingStatus).join(', ')}`,
  })
  status: BorrowingStatus;
}
