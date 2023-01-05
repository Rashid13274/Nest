import{ISession} from 'connect-typeorm';
import{Column, Index, PrimaryColumn,Entity} from 'typeorm';
 

@Entity({name:'session'})
export class SessionEntity implements ISession {
    @Index()
    @Column('bigint')
    expiredAt= Date.now();

    @PrimaryColumn('varchar',{length:255})
    id: '';  // this is id which session will generate.
  
    @Column('test')
    json =''; // here we'll store the data.
    
}