import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configSevice: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configSevice.get<string>('DATABASE_HOST'),
      port: this.configSevice.get<number>('DATABASE_PORT'),
      username: this.configSevice.get<string>('DATABASE_ID'),
      password: this.configSevice.get<string>('DATABASE_PW'),
      database: this.configSevice.get<string>('DATABASE_NAME'),
      entities: [],
      synchronize: true, //- 개발 단계에서 스키마의 용이한 수정을 위해서 덮어쓰기 허용, 배포 단계에선 바꿔줘야함
    };
  }
}
