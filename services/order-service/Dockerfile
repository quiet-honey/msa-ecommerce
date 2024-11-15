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
# Gradle과 JDK 17이 포함된 이미지 사용
FROM gradle:7.6-jdk17

# 작업 디렉토리 설정
WORKDIR /app

# 작업 디렉토리 설정: /app 디렉토리를 컨테이너에서 작업 디렉토리로 설정
# Gradle 캐시를 활용하기 위해 설정 파일 복사
COPY build.gradle settings.gradle ./
RUN gradle dependencies --no-daemon || return 0

# 소스 코드 복사
COPY src ./src

# DevTools 활성화를 위해 bootRun 실행
# -Djava.security.egd 옵션은 보안 랜덤 소스를 사용해 빠르게 기동할 수 있도록 함
CMD ["gradle", "bootRun", "-Dspring.devtools.restart.enabled=true", "-Djava.security.egd=file:/dev/./urandom", "--no-daemon"]