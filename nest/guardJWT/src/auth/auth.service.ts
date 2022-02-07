import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto';

const users = require('../user.json');

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signInLocal(dto: AuthDto) {
    const user = users.find((_user) => _user.email === dto.email);

    if (!user) throw new UnauthorizedException('Credentials incorrect.');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Credentials incorrect.');

    return this.signUser(user.id, user.email, 'user');
  }

  signUser(userId: string, email: string, type: string) {
    return this.jwtService.sign({
      sub: userId,
      email,
      claim: type,
    });
  }
}
