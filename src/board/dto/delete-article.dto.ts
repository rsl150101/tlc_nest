import { PickType } from '@nestjs/mapped-types';
// import { IsNumber } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

//* @nestjs/mapped-types 없이 기존의 작성
// export class DeleteArticleDto {
//   @IsNumber()
//   readonly password: number;
// }

//* @nestjs/mapped-types 으로 작성
export class DeleteArticleDto extends PickType(CreateArticleDto, [
  'password',
] as const) {}
