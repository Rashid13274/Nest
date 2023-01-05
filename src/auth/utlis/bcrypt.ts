import * as bcrypt from 'bcrypt';

export function encodePassword(rawPassword:string) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassword, SALT);
    
}

export function comparePassword(rawPassword:string, hash:string){
    // rawPassword i.e user gonna put in the filed.
return bcrypt.compareSync(rawPassword,hash);
}