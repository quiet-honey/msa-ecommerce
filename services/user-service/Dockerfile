# 베이스 이미지 설정: Python 3.9을 사용하여 컨테이너 환경을 시작
FROM python:3.9

# 작업 디렉토리 설정: /app 디렉토리를 컨테이너에서 작업 디렉토리로 설정
WORKDIR /app

# 필요한 패키지 설치: requirements.txt 파일을 복사한 후, 해당 패키지들을 설치
COPY requirements.txt .
RUN pip install -r requirements.txt

# 애플리케이션 코드 복사: 로컬의 현재 디렉토리의 모든 파일을 컨테이너의 /app 디렉토리에 복사
COPY . .

# FastAPI 애플리케이션 실행: Uvicorn을 사용해 FastAPI 애플리케이션을 실행합
# --host 0.0.0.0: 컨테이너 외부에서도 접근할 수 있도록 설정
# --port 8000: FastAPI 서버가 컨테이너의 8000번 포트에서 실행되도록 설정
# --reload: 자동 리로딩 활성화
CMD [\
    "uvicorn", \
    "main:app", \
    "--host", "0.0.0.0", \
    "--port", "8000",\
    "--reload" \
]
