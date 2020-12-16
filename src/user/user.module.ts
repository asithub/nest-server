import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from './schema/user.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: 'db_users', schema: UserSchema }
        ]),
        AuthModule
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule { }
