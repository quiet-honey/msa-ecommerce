# 베이스 이미지 설정: Java 17을 사용하여 Spring Boot 애플리케이션을 실행할 수 있는 환경을 구성
FROM openjdk:18-jdk-slim

# 작업 디렉토리 설정: /app 디렉토리를 컨테이너에서 작업 디렉토리로 설정
WORKDIR /app

# 빌드된 모든 JAR 파일을 /app 디렉토리에 app.jar로 복사
COPY build/libs/*.jar app.jar

# 애플리케이션 실행: 복사한 app.jar 파일을 실행하여 Spring Boot 애플리케이션을 시작
# -Djava.security.egd 옵션은 보안 랜덤 소스를 사용해 빠르게 기동할 수 있도록 함
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]
