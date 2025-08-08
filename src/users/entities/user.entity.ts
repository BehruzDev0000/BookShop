import { Column, Model, Table, HasMany, DataType } from 'sequelize-typescript';
import { Borrowing } from 'src/borrowings/entities/borrowing.entity';

@Table({ 
    tableName: 'users',
    timestamps:true,
    underscored:true
})
export class User extends Model {
    @Column({ 
        primaryKey: true, 
        autoIncrement: true,
        type: DataType.INTEGER
    })
    declare id: number;

    @Column({ 
        allowNull: false,
        type: DataType.STRING,
        field: 'first_name'
    })
    declare first_name: string;

    @Column({ 
        allowNull: false,
        type: DataType.STRING,
        field: 'last_name'
    })
    declare last_name: string;

    @Column({ 
        allowNull: false,
        type: DataType.STRING,
        unique: true
    })
    declare email: string;

    @HasMany(() => Borrowing, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    declare borrowings: Borrowing[];
}