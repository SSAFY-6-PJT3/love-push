# Backend 포팅매뉴얼

## 소개

joalarm Backend 빌드 매뉴얼



## 기술스택

| Name               | Version    |
| ------------------ | ---------- |
| Java               | 11         |
| Spring boot        | 2.6.6      |
| Gradle             | gradle-7.4 |
| JPA                |            |
| MySQL              | 8.0.28     |
| Mongodb            | 5.0.7      |
| Docker & Dockerhub |            |



## 개발 환경 구성

>  Docker를 활용하여 빌드한다.

### 1. Docker Image Pull

- Springboot

  ```bash
  $ Docker pull gkuer/joalarm-springboot
  ```

- Mysql

  ```bash
  $ Docker pull gkuer/joalarm-mysql
  ```

- Mongodb

  ```bash
  $ Docker pull gkuer/joalarm-mongo
  ```



## 2. Docker Run

* Docker Image 확인

  ```bash
  $ Docker images -a
  ```

- Mysql

  ```bash
  $ Docker run -d -p 3306:3306 {gkuer/joalarm-mysql id}
  ```

- Mongodb

  ```bash
  $ Docker run -d -p 27017:27107 {gkuer/joalarm-mongo id}
  ```

- Springboot

  ```bash
  $ Docker run -d -p 8000:8000 {gkuer/joalarm-springboot id}
  ```



## 디렉토리 구조

### Spring Boot

```
📦joalarm
 ┣ 📂src
 ┃ ┣ 📂main
 ┃ ┃ ┣ 📂java
 ┃ ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┃ ┗ 📂cupid
 ┃ ┃ ┃ ┃ ┃ ┗ 📂joalarm
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂accout
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂jwt
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂chat
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂DTO
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂chatroom
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂DTO
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂sequence
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂contact
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂gpsSector
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂DTO
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂scheduler
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂heart
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂DTO
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂mon
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂util
 ┃ ┃ ┗ 📂resources
 ┣ 📜.gitignore
 ┣ 📜build.gradle
 ┣ 📜Dockerfile
 ┣ 📜Dockerfile-local
 ┣ 📜gradlew
 ┣ 📜gradlew.bat
 ┣ 📜Jenkinsfile
 ┣ 📜joalarm-auto-deploy-springboot.yaml
 ┗ 📜settings.gradle
```

