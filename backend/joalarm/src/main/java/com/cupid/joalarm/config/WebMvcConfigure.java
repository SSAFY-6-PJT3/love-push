package com.cupid.joalarm.config;

import com.cupid.joalarm.accout.jwt.BearerAuthInterceptor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfigure implements WebMvcConfigurer {

    private static final Logger logger = LoggerFactory.getLogger(WebMvcConfigure.class);

    private final BearerAuthInterceptor bearerAuthInterceptor;


    public WebMvcConfigure(BearerAuthInterceptor bearerAuthInterceptor){
        this.bearerAuthInterceptor = bearerAuthInterceptor;
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:3000");
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry){
        logger.info(">>> 인터셉터 등록");
        System.out.println(">>> 인터셉터 등록");
        registry.addInterceptor(bearerAuthInterceptor)
                .addPathPatterns("/accounts/info")
                .addPathPatterns("/test") // 로그인 사태인지 확인 되어야 하느 url
                .addPathPatterns("/accounts/report");
    }
}
