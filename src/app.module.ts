import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import { TypeOrmConfigService } from './config/typeorm.config.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }), //- 데이터베이스 설정 내용을 전역적으로 설정
    BoardModule,
  ], //- 통상적으로 외부 모듈을 위에 유저 모듈을 아래에 적는다.
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
