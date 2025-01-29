import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCityDto {

    @ApiProperty({
        type: String,
        required: true,
        default: "Tashkent"
    })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({
        type: Number,
        required: true,
        default: 69.2401
    })
    @IsNotEmpty()
    @IsNumber()
    latitude:number

    @ApiProperty({
        type: Number,
        required: true,
        default: 41.2995
    })
    @IsNotEmpty()
    @IsNumber()
    longitude:number

    @ApiProperty({
        type:Number,
        required:true,
        example:1
    })
    @IsNumber()
    @IsNotEmpty()
    countryId:number
}
