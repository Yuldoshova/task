import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class LoginDto {

    @ApiProperty({
        type: String,
        example: 'johndoe',
        description: 'Username of the user',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    username: string

    @ApiProperty({
        type: String,
        example: '123passwordUSER',
        description: 'Password of the user',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string
}