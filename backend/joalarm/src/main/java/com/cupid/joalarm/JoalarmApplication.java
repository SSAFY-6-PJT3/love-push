package com.cupid.joalarm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude={DataSourceAutoConfiguration.class})
public class JoalarmApplication {

	public static void main(String[] args) {
		SpringApplication.run(JoalarmApplication.class, args);
	}

}
