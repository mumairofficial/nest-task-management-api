import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from "class-validator";

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/,
    {
      message: 'Password to week'
    })
  password: string;
}