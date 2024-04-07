import { Controller } from '@nestjs/common';

import { AuthService } from './auth.service';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';
import { auth } from './proto/auth';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @GrpcMethod('AdminService', 'SignIn')
  signIn(data: auth.User, metadata: Metadata): Promise<auth.Token> {
    return this.authService.signIn(data);
  }

  @GrpcMethod('AdminService', 'Verify')
  verify(data: auth.Token, metadata: Metadata): Promise<auth.Status> {
    console.log('your request came hee first********************************');
    return this.authService.verify(data.token);
  }
}
