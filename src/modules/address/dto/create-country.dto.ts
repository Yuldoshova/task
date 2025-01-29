import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCountryDto {

    @ApiProperty({
        type: String,
        required: true,
        default: "Uzbekistan"
    })
    @IsString()
    @IsNotEmpty()
    name: string
}
