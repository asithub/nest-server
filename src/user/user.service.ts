import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Observable, from, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import * as bcryptjs from 'bcrypt';

import { IUser } from './interface/user.interface';
import { UserDocument } from "./schema/user.schema";
import { AuthService } from './../auth/auth.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel('db_users') private readonly userModel: Model<UserDocument>,
    private authService: AuthService
  ){}

  findAll(): Observable<UserDocument[]> {
    return from(this.userModel.find()).pipe(
      map((data: UserDocument[]) => {
        data.forEach(v => {
          v.password = undefined;
        })
        return data;
      })
    )
  }

  findOne(id: string): Observable<UserDocument> {
    return from(this.userModel.findOne({_id: id})).pipe(
      map((data: UserDocument) => {
        data.password = undefined;
        return data;
      })
    )
  }

  // Registration Service
  async create(user: IUser): Promise<UserDocument> {
    const { name, email, password } = user;
    const hashedPassword = await bcryptjs.hash(password, 4);
    const uniqueUser = await this.userModel.findOne({email: email});
    
    if (uniqueUser) {
      throw new HttpException('User EMAIL is already used', HttpStatus.UNAUTHORIZED);
    } else {
      return await new this.userModel({
        ...user,
        password: hashedPassword
      }).save();
    }
  }

  // Delete user
  async delete(id: string): Promise<UserDocument> {
    const findDeleteUser = await this.userModel.findByIdAndDelete(id);
    findDeleteUser.password = undefined;
    return findDeleteUser;
  }

  // Login Service
  async login(user: IUser) : Promise<UserDocument> {
    const { email, password } = user;
    const findUser = await this.userModel.findOne({email: email});
    if(!findUser) {
      throw new HttpException('Invalid user credential', HttpStatus.NOT_FOUND);
    } else {
      if(await bcryptjs.compare(password, findUser.password)) {
        findUser.password = undefined;
        return await this.authService.generateJwt(findUser);
      } else {
        throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
      }
    }
  }

}
