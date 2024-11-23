# OpenJDK 17 Slim 이미지 사용
FROM openjdk:17-jdk-slim

# 애플리케이션 실행 경로 설정
WORKDIR /app

# JAR 파일을 실행하기 위한 스크립트 복사
COPY run.sh /app/run.sh
RUN chmod +x /app/run.sh

# run.sh를 실행하도록 설정
CMD ["./run.sh"]