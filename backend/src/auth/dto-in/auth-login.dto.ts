import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail({}, {
        message: 'Please enter a valid email address.'
    })
    @IsNotEmpty({
        message: 'Please enter your email address.'
    })
    @ApiProperty()
    email: string;

    @IsString({
        message: 'Invalid password entry.'
    })
    @IsNotEmpty({
        message: 'Please enter your password.'
    })
    @ApiProperty()
    password: string;
}