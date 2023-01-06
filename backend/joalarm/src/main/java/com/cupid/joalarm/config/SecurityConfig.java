package com.cupid.joalarm.config;

import com.cupid.joalarm.account.jwt.JwtAccessDeniedHandler;
import com.cupid.joalarm.account.jwt.JwtAuthenticationEntryPoint;
import com.cupid.joalarm.account.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableWebSecurity // 스프링 시큐리티 필터가 스프링 필터체인에 등록
@EnableGlobalMethodSecurity(prePostEnabled = true) // secured 어노테이션 활성화 ex)@Secured("ROLE_USER")
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web
                .ignoring()
                .antMatchers("h2-console/**", "/favicon.ico")
                .antMatchers("/swagger-ui/**", "/v2/api-docs");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // token 방식을 사용하기 때문에  disable
                .formLogin().disable() // form tag로 login 비활성화
                .httpBasic().disable() // http basic auth 로그인 인증창이 뜸. 기본 인증 로그인을 이용하지 않으면 disable

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
                .antMatchers("/chat/**").permitAll()  // 채팅, 채팅방 진입점
                .antMatchers("/accounts/{user}/emoji").permitAll()
                .antMatchers("/emojis").permitAll() // 이모지 전체 조회
                .antMatchers("/heart/**").permitAll()  // 하트 진입점
                .antMatchers("/accounts/id").permitAll()
                .antMatchers("/contacts").permitAll()
                .antMatchers("/feed").permitAll()
                .antMatchers("/feed/**").permitAll()
                .antMatchers("/school").permitAll()
                .antMatchers("/school/**").permitAll()
                .antMatchers("/love").permitAll()
                .antMatchers("/notice").permitAll()
                .antMatchers("/notice/**").permitAll()
                .antMatchers("/chatroom").permitAll()
                .antMatchers("/chatroom/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtFilterSecurityConfig(tokenProvider)); // addFilterBefore로 등록했던 JwtSecurityConfig 적용
    }
}
