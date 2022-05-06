FROM openjdk:11
EXPOSE 8888
ARG JAR_FILE=build/libs/joalarm-1.0.0-SNAPSHOT.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]