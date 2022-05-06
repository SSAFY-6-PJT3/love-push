package com.cupid.joalarm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

// http://localhost:8888/api/swagger-ui/index.html
@SpringBootApplication
@EnableScheduling
public class JoalarmApplication {

	public static void main(String[] args) {
		System.out.println(">>> 애플리케이션 실행");
		SpringApplication.run(JoalarmApplication.class, args);
	}

}
