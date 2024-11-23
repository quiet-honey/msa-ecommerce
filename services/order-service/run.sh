#!/bin/bash

# 애플리케이션 JAR 파일 경로 설정
APP_JAR="/app/build/libs/order-service-0.0.1-SNAPSHOT.jar"

LAST_MODIFIED="" # JAR 파일의 마지막 수정 시간

APP_PID=""     # 실행 중인 애플리케이션의 PID
BUILD_PID=""   # Gradle 빌드 프로세스의 PID

# 로그 출력 함수
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] - $1"
}

# 애플리케이션 시작 함수
start_app() {
  log "Starting application..."
  if [ -f "$APP_JAR" ]; then
    # JAR 파일이 존재하면 실행
    java -jar $APP_JAR &   # JAR 파일 실행
    APP_PID=$!             # $!는 이전 명령의 PID, 즉 실행된 프로세스의 PID를 저장
    log "Application started with PID $APP_PID."
  else # JAR 파일이 없을 경우 로그 출력
    log "JAR file not found. Cannot start application." 
  fi
}

# 애플리케이션 종료 함수
stop_app() {
  if [ -n "$APP_PID" ]; then
    # 실행된 애플리케이션이 있을 경우 종료
    log "Stopping application with PID $APP_PID..."
    kill $APP_PID # PID를 사용해 프로세스 종료

    # wait 명령을 사용하여 프로세스가 종료될 때까지 대기
    # 2>/dev/null 명령을 사용하여 wait 명령의 stderr(2) 출력을 무시
    # || 연산자를 사용하여 $APP_PID 명령이 실패하면($APP_PID에 해당하는 프로세스가 이미 종료됨) 로그 출력
    wait $APP_PID 2>/dev/null || log "Application process already stopped."
    APP_PID="" # PID 초기화
  fi
}

# Gradle 연속 빌드 실행 함수
# Gradle의 --continuous 모드를 사용하여 소스 변경 시 자동으로 빌드가 실행되도록 설정
run_continuous_build() {
  log "Starting Gradle build --continuous..."
  ./gradlew build --continuous -x test &   # Gradle 빌드 명령 실행 (백그라운드)
  BUILD_PID=$! # 빌드 프로세스의 PID 저장
}

# JAR 파일 변경 감지 및 애플리케이션 재시작 함수
monitor_changes() {
  log "Monitoring JAR file changes..."
  while true; do
    # JAR 파일의 마지막 수정 시간 확인
    # stat -c %Y $APP_JAR: stat 명령을 사용하여 $APP_JAR 파일의 마지막 수정 시간를 확인하고 %Y 옵션으로 Unix 타임스탬프를 가져옴
    # stat 명령이 실패하면(파일이 없거나 권한이 없는 경우) 0을 출력하도록 설정
    CURRENT_MODIFIED=$(stat -c %Y $APP_JAR 2>/dev/null || echo "0")
    
    if [ "$LAST_MODIFIED" != "$CURRENT_MODIFIED" ] && [ "$CURRENT_MODIFIED" != "0" ]; then
      # 수정 시간이 변경되면 애플리케이션 재시작
      log "Detected changes in $APP_JAR. Restarting application..."
      stop_app # 실행 중인 애플리케이션 종료
      start_app # 애플리케이션 재시작
      LAST_MODIFIED=$CURRENT_MODIFIED # 수정 시간 업데이트
    fi

    sleep 2 # 변경 감지 간격 (2초)
  done
}

# Gradle 연속 빌드 실행
# 파일 변경 시 자동 빌드를 트리거
run_continuous_build

# 초기 설정
log "Initializing script..."

# JAR 파일 확인 및 에러 처리
# 초기 빌드 결과가 없을 경우, JAR 파일 생성될 때까지 대기
# -f 옵션을 사용하여 파일이 존재하는지 확인
if [ ! -f "$APP_JAR" ]; then
  log "JAR file not found. Waiting for build..."
  while [ ! -f "$APP_JAR" ]; do
    sleep 2    # 2초 간격으로 JAR 파일 확인
  done
  log "JAR file found. Continuing..."
fi

# JAR 파일의 마지막 수정 시간 저장
# JAR 파일의 변경 여부를 확인하기 위해 초기값을 설정
LAST_MODIFIED=$(stat -c %Y $APP_JAR)

# 애플리케이션 실행
# 초기 빌드된 JAR 파일을 실행
start_app

# JAR 파일 변경 감지 시작
# 애플리케이션의 변경 사항 반영을 위해 JAR 파일을 지속적으로 감시
monitor_changes