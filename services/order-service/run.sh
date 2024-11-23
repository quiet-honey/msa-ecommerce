#!/bin/bash

APP_JAR="/app/build/libs/order-service-0.0.1-SNAPSHOT.jar"
LAST_MODIFIED=""

# 로그 출력 함수
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] - $1"
}

start_app() {
  log "Starting application..."
  java -jar $APP_JAR &
  APP_PID=$!
}

stop_app() {
  if [ -n "$APP_PID" ]; then
    log "Stopping application with PID $APP_PID..."
    kill $APP_PID
    wait $APP_PID 2>/dev/null
  fi
}

monitor_changes() {
  while true; do
    # 현재 JAR 파일의 수정 시간 확인
    CURRENT_MODIFIED=$(stat -c %Y $APP_JAR)
    
    if [ "$LAST_MODIFIED" != "$CURRENT_MODIFIED" ]; then
      log "Detected changes in $APP_JAR. Restarting application..."
      stop_app
      start_app
      LAST_MODIFIED=$CURRENT_MODIFIED
    fi

    sleep 2 # 변경 감지 간격
  done
}

# 초기 설정
if [ ! -f "$APP_JAR" ]; then
  log "JAR file not found at $APP_JAR. Exiting..."
  exit 1
fi

LAST_MODIFIED=$(stat -c %Y $APP_JAR)
start_app
monitor_changes