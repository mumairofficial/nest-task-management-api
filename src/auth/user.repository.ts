import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const {username, password} = authCredentialsDto;
    // BAD becasue two queries are being executed
    // const exists = this.findOne({ username })

    // if (exists) {
    //   // ... throw error
    // }

    // GOOD: Add unique decorator to .enity file

    const user = new User();
    user.username = username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') { // duplicate username
        throw new ConflictException('Username already exist')
      } else {
        throw new InternalServerErrorException()
      }
    }
  }

  async validateUserPassword(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user && await user.validatePassword(password)) {
      return user.username;
    }

    return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}