import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import _ from 'lodash';

@Injectable()
export class BoardService {
  private articles = [];
  private articlePasswords = new Map(); //- 파이썬의 딕셔너리와 유사한 자료구조

  getArticles() {
    return this.articles;
  }

  getArticleById(id: number) {
    return this.articles.find((article) => article.id === id);
  }

  createArticle(title: string, content: string, password: number) {
    const articleId = this.articles.length + 1;
    this.articles.push({ id: articleId, title, content });
    this.articlePasswords.set(articleId, password);
    return articleId;
  }

  updateArticle(id: number, title: string, content: string, password: number) {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id: ' + id);
      //- Nest.js 는 자체적으로 http 상태코드에 대한 처리와 예외에 대한 생각을 최소화할 수 있게 그러한 예외 처리를 제공해준다
    }

    const article = this.getArticleById(id);
    if (_.isNil(article)) {
      throw new NotFoundException('Article not found. id :' + id);
    }

    article.title = title;
    article.content = content;
  }

  deleteArticle(id: number, password: number) {
    if (this.articlePasswords.get(id) !== password) {
      throw new UnauthorizedException('Password is not correct. id: ' + id);
    }

    this.articles = this.articles.filter((article) => article.id !== id);
  }
}
