import{Column, Entity,PrimaryGeneratedColumn} from 'typeorm';
@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type:'bigint'
    })
    id :number;
    @Column({
        nullable :false,
        default: '',
        unique:true
    })
    username:string;
    @Column({
        default:''
    })
    password:string;
    

    @Column({
       
    })
    email:string;
}