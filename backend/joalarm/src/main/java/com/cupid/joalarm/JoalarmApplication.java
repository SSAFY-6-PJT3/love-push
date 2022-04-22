package com.cupid.joalarm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

// http://localhost:8888/swagger-ui/index.html
@SpringBootApplication
@EnableScheduling
public class JoalarmApplication {

	public static void main(String[] args) {
		SpringApplication.run(JoalarmApplication.class, args);
	}

}
