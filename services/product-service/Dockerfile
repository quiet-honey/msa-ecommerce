# 베이스 이미지 설정: Node.js 18 LTS 버전을 사용하여 NestJS 환경을 구성
FROM node:18

# 작업 디렉토리 설정: /app 디렉토리를 컨테이너의 작업 디렉토리로 설정
WORKDIR /app

# 패키지 파일 복사 및 설치: package.json과 package-lock.json을 복사하고 npm install로 의존성을 설치
COPY package*.json ./

# 의존성 설치
RUN npm install

# 개발용 의존성도 설치 (nodemon 포함)
RUN npm install --only=dev

# 애플리케이션 코드 복사: 로컬의 모든 소스 파일을 컨테이너의 /app 디렉토리에 복사
COPY . .

# 애플리케이션 포트 설정
EXPOSE 3000

# nodemon을 통해 NestJS 앱 실행
CMD ["npx", "nodemon", "-L", "--config", "nodemon.json"]
