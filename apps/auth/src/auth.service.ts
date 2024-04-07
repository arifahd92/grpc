import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { auth } from './proto/auth';
import { UserDB } from 'db/user/user-array';

@Injectable()
export class AuthService {
  private readonly db = UserDB;

  constructor(private jwtService: JwtService) {}

  async signIn(data: auth.User): Promise<auth.Token> {
    const { id, username, password, role } = data;
    let index = UserDB.findIndex(
      (item) =>
        item.id == id &&
        item.username == username &&
        item.password === password,
    );
    if (index == -1) {
      return { token: 'you are not registered user' };
    }
    const payload = {
      sub: id,
      username: username,
      password: password,
      role: role,
    };
    const access_token = await this.jwtService.signAsync(payload);

    return { token: `${access_token}` };
  }

  async verify(token: any): Promise<auth.Status> {
    try {
      // console.log('THIS IS VERIFY');
      console.log('THIS IS token', token);

      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'JWT_SECRET',
      });

      let userFromDb = this.db.find((user) => user.id === payload.sub);
      console.log(userFromDb, 'this is userFromDb');
      console.log(payload, 'this is payload');
      if (
        payload.username === userFromDb.username &&
        payload.password === userFromDb.password &&
        payload.role === userFromDb.role
      ) {
        console.log('This is verify TRUE');
        return { value: true, role: userFromDb.role };
      } else {
        return { value: false, role: 'undefined' };
      }
    } catch {
      console.log('SOmething went wrong while veryfing');
      return { value: false, role: 'undefined' };
    }
  }
}
