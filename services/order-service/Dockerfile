# 베이스 이미지 설정: Java 17을 사용하여 Spring Boot 애플리케이션을 실행할 수 있는 환경을 구성
# Gradle과 JDK 17이 포함된 이미지 사용
FROM gradle:7.6-jdk17 AS build

# 작업 디렉토리 설정
WORKDIR /app

# Gradle 캐시를 활용하기 위해 build.gradle과 settings.gradle을 먼저 복사
COPY build.gradle settings.gradle ./
RUN gradle build --no-daemon || return 0  # 종속성 캐시 생성

# 소스 코드 복사 및 빌드
COPY src ./src
RUN gradle clean build --no-daemon -x test # test 제외

# 2단계: 실행 스테이지
FROM openjdk:17-jdk-slim

# 작업 디렉토리 설정: /app 디렉토리를 컨테이너에서 작업 디렉토리로 설정
WORKDIR /app

# 빌드 단계에서 생성된 JAR 파일을 app.jar로 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 애플리케이션 실행: 복사한 app.jar 파일을 실행하여 Spring Boot 애플리케이션을 시작
# -Djava.security.egd 옵션은 보안 랜덤 소스를 사용해 빠르게 기동할 수 있도록 함
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]
