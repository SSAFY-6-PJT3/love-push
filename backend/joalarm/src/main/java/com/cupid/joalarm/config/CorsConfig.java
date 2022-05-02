package com.cupid.joalarm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter() {    // 필터 만들고 난 뒤 SecurityConfig에 필터 등록 필요,,
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);   // 이 서버에서 응답을 보냈을 때 JSON을 자바스크립트에서 처리할 수 있게 할지 설정. false일 경우 자바스크립트에서 응답 받지 못함.
        config.addAllowedOrigin("*");       // 모든 IP에 응답을 허용
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");       // 모든 header에 응답 허용
        config.addAllowedMethod("*");       // 모든 get, post, put, delete, patch 요청 허용
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}

