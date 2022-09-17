import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto implements AuthResponse {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty()
    lastName: string;

    @ApiProperty()
    token: string;
}