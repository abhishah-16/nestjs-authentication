import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';


export class AuthDto {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 20, { message: "Password must between 3 to 20 character" })
    password: string;
}