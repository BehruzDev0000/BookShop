import { Column, Model, Table, BelongsTo, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';


export enum BorrowingStatus {
    BORROWED = 'BORROWED',
    RETURNED = 'RETURNED',
    OVERDUE = 'OVERDUE',
    LOST = 'LOST'
}
@Table({ 
    tableName: 'borrowings',
    timestamps:true
})
export class Borrowing extends Model {
    @Column({ 
        primaryKey: true, 
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @ForeignKey(() => User)
    @Column({ 
        allowNull: false,
        type: DataType.INTEGER,
        field: 'user_id'
    })
    declare user_id: string;

    @ForeignKey(() => Book)
    @Column({ 
        allowNull: false,
        type: DataType.INTEGER,
        field: 'book_id'
    })
    declare book_id: string;

    @Column({ 
        allowNull: false,
        type: DataType.DATE,
        field: 'borrow_date'
    })
    declare borrow_date: Date;

    @Column({ 
        allowNull: true,
        type: DataType.DATE,
        field: 'return_date'
    })
    declare return_date: Date;

    @Column({ 
        allowNull: false,
        type: DataType.ENUM(...Object.values(BorrowingStatus)),
        defaultValue: BorrowingStatus.BORROWED
    })
    declare status: BorrowingStatus;

    @BelongsTo(() => User)
    declare user: User;

    @BelongsTo(() => Book)
    declare book: Book;
}