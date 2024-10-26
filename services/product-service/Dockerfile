# 베이스 이미지 설정: Node.js 18 LTS 버전을 사용하여 NestJS 환경을 구성
FROM node:18

# 작업 디렉토리 설정: /app 디렉토리를 컨테이너의 작업 디렉토리로 설정
WORKDIR /app

# 패키지 파일 복사 및 설치: package.json과 package-lock.json을 복사하고 npm install로 의존성을 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 코드 복사: 로컬의 모든 소스 파일을 컨테이너의 /app 디렉토리에 복사
COPY . .

# NestJS 애플리케이션 빌드: TypeScript로 작성된 코드를 JavaScript로 변환하여 dist 폴더에 저장
RUN npm run build

# NestJS 서버 실행: 빌드된 애플리케이션을 실행
# npm start:production 스크립트를 사용해 production 모드로 실행
CMD ["npm", "run", "start:prod"]