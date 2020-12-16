import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { from, Observable } from 'rxjs';
import * as bcryptjs from 'bcrypt';
import { IUser } from '../user/interface/user.interface';
import config from './../config/keys';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){}

    async generateJwt(user: IUser): Promise<any> {
        return this.jwtService.signAsync({user}, {expiresIn: '1000s', secret: process.env.JWT_SECRET});
    }

    comparePasswords(newPassword: string, passwortHash: string): Observable<any>{
        return from(bcryptjs.compare(newPassword, passwortHash));
    }

}
