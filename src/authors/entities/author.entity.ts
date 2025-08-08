import { Column, Model, Table, HasMany, DataType, AutoIncrement } from 'sequelize-typescript';
import { Book } from 'src/books/entities/book.entity';

@Table({ 
    tableName: 'authors',
    timestamps:true,
    underscored:true
})
export class Author extends Model {
    
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
    declare name: string;

    @Column({ 
        type: DataType.TEXT, 
        allowNull: true 
    })
    declare bio: string;

    @HasMany(() => Book, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    declare books: Book[];
}