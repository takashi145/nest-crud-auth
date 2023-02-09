import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  description: string;
}