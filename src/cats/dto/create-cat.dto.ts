import { 
    IsDate,
    IsInt,
    IsOptional, 
    IsPositive, 
    IsString, 
    MinLength 
} from "class-validator";

export class CreateCatDto {

    @IsString()
    @MinLength(1)
    name: string
    
    @IsInt()
    @IsPositive()
    age: number

    @IsString()
    @IsOptional()
    breed?: string;

    @IsDate()
    @IsOptional()
    deleteAt?: Date

}
