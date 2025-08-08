import { Column, Model, Table, BelongsTo, HasMany, DataType, ForeignKey } from 'sequelize-typescript';
import { Author } from 'src/authors/entities/author.entity';
import { Borrowing } from 'src/borrowings/entities/borrowing.entity';

@Table({ 
    tableName: 'books',
    timestamps:true
})
export class Book extends Model {
    @Column({ 
        primaryKey: true, 
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column({ 
        allowNull: false,
        type: DataType.STRING
    })
    declare title: string;

    @ForeignKey(() => Author)
    @Column({ 
        allowNull: false,
        type: DataType.INTEGER,
        field: 'author_id'
    })
    declare authorId: string;

    @Column({ 
        allowNull: true,
        type: DataType.STRING
    })
    declare isbn: string;

    @Column({ 
        allowNull: true,
        type: DataType.INTEGER,
        field: 'published_year'
    })
    declare published_year: number;

    @BelongsTo(() => Author)
    declare author: Author;

    @HasMany(() => Borrowing, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    declare borrowings: Borrowing[];
}