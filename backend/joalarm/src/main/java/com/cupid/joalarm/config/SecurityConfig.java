package com.cupid.joalarm.config;

import com.cupid.joalarm.accout.jwt.JwtAccessDeniedHandler;
import com.cupid.joalarm.accout.jwt.JwtAuthenticationEntryPoint;
import com.cupid.joalarm.accout.jwt.JwtSecurityConfig;
import com.cupid.joalarm.accout.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    public SecurityConfig(TokenProvider tokenProvider, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint, JwtAccessDeniedHandler jwtAccessDeniedHandler) {
        this.tokenProvider = tokenProvider;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("/h2-console/**", "/favicon.ico")
                .antMatchers( "/swagger-ui/**","/v2/api-docs");;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // token 방식을 사용하기 때문에  disable

                .exceptionHandling() // Exception 핸들링 클래스 추가
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and() // h2 console을 위한 설정
                .headers()
                .frameOptions()
                .sameOrigin()

                .and() // 세션을 사용하지 않기 떄문에 stateless 설정정
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .antMatchers("/accounts").permitAll() // singup
                .antMatchers("/accounts/login").permitAll() // login 토큰이 없는 상태에서 요청
                .antMatchers("/swagger-resources/**").permitAll() // swagger
                .antMatchers("/ws-stomp/**").permitAll()  // Stomp 진입점
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider)); // addFilterBefore로 등록했던 JwtSecurityConfig 적용

    }
}
