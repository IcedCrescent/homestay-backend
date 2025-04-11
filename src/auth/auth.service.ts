import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';
import { JwtPayload } from 'src/types/express';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(data: {
    name: string;
    email: string;
    password: string;
    role: string;
    isMale: boolean;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role as Role,
        isMale: data.isMale,
      },
    });

    return {
      user,
      token: this.generateToken(user.id, user.role),
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const { password: hashedPassword, ...userWithoutPassword } = user;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      user: userWithoutPassword,
      token: this.generateToken(user.id, user.role),
    };
  }

  async verifyJwt(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token);
  }

  private generateToken(userId: number, role: string) {
    return this.jwtService.sign({ userId, role });
  }
}
