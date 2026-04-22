# TLC Nest Board API

NestJS, TypeORM, 그리고 MySQL을 사용하여 구축한 간단한 게시판 API 프로젝트입니다.

## 🚀 주요 기능

- **게시글 관리 (CRUD)**: 게시글의 목록 조회, 상세 조회, 작성, 수정, 삭제 기능을 제공합니다.
- **비밀번호 기반 권한 확인**: 게시글 수정 및 삭제 시 작성 시 설정한 비밀번호를 통해 권한을 확인합니다.
- **소프트 삭제 (Soft Delete)**: 데이터를 물리적으로 삭제하지 않고 `deletedAt` 컬럼을 통해 논리적으로 삭제 처리합니다.
- **환경 변수 관리**: `@nestjs/config`를 사용하여 데이터베이스 설정 등을 관리합니다.
- **데이터 검증**: `class-validator` 및 `class-transformer`를 사용하여 DTO 레벨에서 입력을 검증합니다.

## 🛠 기술 스택

- **Framework**: NestJS (v9)
- **Database**: MySQL
- **ORM**: TypeORM
- **Language**: TypeScript
- **Tools**: Prettier, ESLint, Jest

## 📁 프로젝트 구조

```text
src
├── app.module.ts          # Root Module
├── main.ts                # Entry Point
├── board                  # 게시판 관련 모듈
│   ├── article.entity.ts  # 게시글 엔티티
│   ├── board.controller.ts# API 엔드포인트 정의
│   ├── board.service.ts   # 비즈니스 로직
│   └── dto                # 데이터 전송 객체
└── config                 # 설정 관련 파일
    └── typeorm.config.service.ts
```

## ⚙️ 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 루트 디렉토리에 생성하고 아래 내용을 설정합니다. (현재 `.gitignore`에 포함되어 있어 직접 생성해야 합니다.)

```env
DATABASE_HOST = "your_db_host"
DATABASE_PORT = "your_db_port"
DATABASE_ID = "your_db_user"
DATABASE_PW = "your_db_password"
DATABASE_NAME = "your_db_name"
```

### 3. 애플리케이션 실행
```bash
# development
npm run start

# watch mode (development)
npm run start:dev

# production mode
npm run start:prod
```

### 4. 테스트
```bash
# unit tests
npm run test
```

## 유의사항

기타 API 테스트는 `route.rest` 파일을 참고하여 `REST Client` 확장을 통해 진행할 수 있습니다.
