import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    id?: string;

    @ApiProperty({ description: 'Un addresse mail est pour un utilisateur' })
    @IsNotEmpty ({ message: 'Ce champ ne peut pas vide' })
    @IsString ({ message: 'the user login must be a string'})
    email!: string;
    
    @ApiProperty({ description: 'Password user' })
    @IsNotEmpty ({ message: 'The user password cannot be ampty' })
    @IsString ({ message: 'the user password must be a string'})
    password!: string
}
