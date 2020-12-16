import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import config from './../config/keys';

@Module({
    imports: [
        JwtModule.register({
            secret: config.jwtSecret,
            signOptions: {expiresIn: '60s'}
        }),
    ],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {}
