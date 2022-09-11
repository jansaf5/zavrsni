import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsEmail({}, {
        message: 'Please enter a valid email address.'
    })
    @IsNotEmpty({
        message: 'Please enter your email address.'
    })
    @ApiProperty()
    email: string;

    @IsString({
        message: 'Invalid first name entry.'
    })
    @IsNotEmpty({
        message: 'First name is required.'
    })
    @ApiProperty()
    firstName: string;

    @IsString({
        message: 'Invalid last name entry.'
    })
    @IsNotEmpty({
        message: 'Last name is required.'
    })
    @ApiProperty()
    lastName: string;

    @IsString({
        message: 'Invalid password entry.'
    })
    @IsNotEmpty({
        message: 'Password is required.'
    })
    @ApiProperty()
    password: string;
}