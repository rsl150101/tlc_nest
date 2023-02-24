import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { DeleteArticleDto } from './dto/delete-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('board') //- routing path is /board -> e.g. http://localhost:3000/board
export class BoardController {
  //+ 서비스 주입
  constructor(private readonly boardService: BoardService) {}

  //+ 게시물 목록 가져오기
  @Get('/articles')
  async getArticles() {
    return await this.boardService.getArticles();
  }

  //+ 게시물 상세 보기
  @Get('/articles/:id')
  async getArticleById(@Param('id') articleId: number) {
    //- @Param : 클라이언트가 전달하는 url 변수를 나타내는 데코레이터
    return await this.boardService.getArticleById(articleId);
  }

  //+ 게시물 생성
  @Post('/articles')
  createArticle(@Body() data: CreateArticleDto) {
    //- @Body : 클라이언트가 전달하는 바디를 나타내는 데코레이터
    return this.boardService.createArticle(
      data.title,
      data.content,
      data.password,
    );
  }

  //+ 게시물 수정
  @Put('/articles/:id')
  async updateArticle(
    @Param('id') articleId: number,
    @Body() data: UpdateArticleDto,
  ) {
    return await this.boardService.updateArticle(
      articleId,
      data.title,
      data.content,
      data.password,
    );
  }

  //+ 게시물 삭제
  @Delete('/articles/:id')
  async deleteArticle(
    @Param('id') articleId: number,
    @Body() data: DeleteArticleDto,
  ) {
    return await this.boardService.deleteArticle(articleId, data.password);
  }
}
