import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import _ from 'lodash';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  // private articles = [];
  // private articlePasswords = new Map(); //- 파이썬의 딕셔너리와 유사한 자료구조

  async getArticles() {
    await this.articleRepository.find({
      where: { deletedAt: null },
      select: ['id', 'author', 'title', 'createdAt'],
    });
  }

  async getArticleById(id: number) {
    // return this.articles.find((article) => article.id === id);
    return await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['author', 'title', 'content', 'createdAt', 'updatedAt'],
    });
  }

  createArticle(title: string, content: string, password: number) {
    // const articleId = this.articles.length + 1;
    // this.articles.push({ id: articleId, title, content });
    // this.articlePasswords.set(articleId, password);
    // return articleId;
    this.articleRepository.insert({
      author: 'test',
      title,
      content,
      password: password.toString(),
    });
  }

  async updateArticle(
    id: number,
    title: string,
    content: string,
    password: number,
  ) {
    // if (this.articlePasswords.get(id) !== password) {
    //   throw new UnauthorizedException('Password is not correct. id: ' + id);
    //   //- Nest.js 는 자체적으로 http 상태코드에 대한 처리와 예외에 대한 생각을 최소화할 수 있게 그러한 예외 처리를 제공해준다
    // }

    // const article = await this.getArticleById(id);
    this.verifyPassword(id, password);

    // article.title = title;
    // article.content = content;
    this.articleRepository.update(id, { title, content });
  }

  async deleteArticle(id: number, password: number) {
    // if (this.articlePasswords.get(id) !== password) {
    //   throw new UnauthorizedException('Password is not correct. id: ' + id);
    // }
    this.verifyPassword(id, password);

    // this.articles = this.articles.filter((article) => article.id !== id);
    this.articleRepository.softDelete(id);
  }

  private async verifyPassword(id: number, password: number) {
    const article = await this.articleRepository.findOne({
      where: { id, deletedAt: null },
      select: ['password'],
    });

    if (_.isNil(article)) {
      throw new NotFoundException('Article not found. id :' + id);
    }

    if (article.password !== password.toString()) {
      throw new UnauthorizedException('Password is not correct. id: ' + id);
    }
  }
}
