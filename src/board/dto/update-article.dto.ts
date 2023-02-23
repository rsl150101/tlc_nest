import { PartialType } from '@nestjs/mapped-types';
// import { IsNumber, IsString } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

//* @nestjs/mapped-types 없이 기존의 작성
// export class UpdateArticleDto {
//   @IsString()
//   readonly title: string;

//   @IsString()
//   readonly content: string;

//   @IsNumber()
//   readonly password: number;
// }

//* @nestjs/mapped-types 으로 작성
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
