import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module'; // Import UserModule to access UserService
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from '../../core/guard/auth.guard';
import { JwtConfigModule } from '../jwt-config/jwt-config.module';

@Module({
  imports: [
    UserModule, // Import UserModule to interact with user-related functionality
    // JwtModule.register({
    //   secret: 'your_jwt_secret', // Use a secure secret or environment variable
    //   signOptions: { expiresIn: '60m' }, // Token expiration
    // }),
    JwtConfigModule
  ],
  providers: [AuthService],
  controllers: [AuthController],
//   exports:[JwtModule]
})
export class AuthModule {}
