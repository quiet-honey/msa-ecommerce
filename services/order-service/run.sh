#!/bin/bash

APP_JAR="/app/build/libs/order-service-0.0.1-SNAPSHOT.jar"
LAST_MODIFIED=""
APP_PID=""
BUILD_PID=""

# 로그 출력 함수
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] - $1"
}

start_app() {
  log "Starting application..."
  if [ -f "$APP_JAR" ]; then
    java -jar $APP_JAR &
    APP_PID=$!
    log "Application started with PID $APP_PID."
  else
    log "JAR file not found. Cannot start application."
  fi
}

stop_app() {
  if [ -n "$APP_PID" ]; then
    log "Stopping application with PID $APP_PID..."
    kill $APP_PID
    wait $APP_PID 2>/dev/null || log "Application process already stopped."
    APP_PID=""
  fi
}

run_continuous_build() {
  log "Starting Gradle build --continuous..."
  ./gradlew build --continuous -x test &
  BUILD_PID=$!
}

monitor_changes() {
  log "Monitoring JAR file changes..."
  while true; do
    CURRENT_MODIFIED=$(stat -c %Y $APP_JAR 2>/dev/null || echo "0")
    
    if [ "$LAST_MODIFIED" != "$CURRENT_MODIFIED" ] && [ "$CURRENT_MODIFIED" != "0" ]; then
      log "Detected changes in $APP_JAR. Restarting application..."
      stop_app
      start_app
      LAST_MODIFIED=$CURRENT_MODIFIED
    fi

    sleep 2
  done
}


# Gradle 연속 빌드 실행
run_continuous_build

# 초기 설정
if [ ! -f "$APP_JAR" ]; then
  log "JAR file not found. Waiting for build..."
  while [ ! -f "$APP_JAR" ]; do
    sleep 2
  done
  log "JAR file found. Continuing..."
fi

LAST_MODIFIED=$(stat -c %Y $APP_JAR)

# 애플리케이션 실행
start_app

# JAR 변경 감지 시작
monitor_changes