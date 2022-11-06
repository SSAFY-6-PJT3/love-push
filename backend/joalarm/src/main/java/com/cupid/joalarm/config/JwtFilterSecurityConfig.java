package com.cupid.joalarm.config;

import com.cupid.joalarm.account.jwt.JwtFilter;
import com.cupid.joalarm.account.jwt.TokenProvider;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

public class JwtFilterSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain,HttpSecurity> {
    private TokenProvider tokenProvider;

    public JwtFilterSecurityConfig(TokenProvider tokenProvider){
        this.tokenProvider=tokenProvider;
    }
    @Override
    public void configure(HttpSecurity http){
        JwtFilter customFilter =new JwtFilter(tokenProvider);
        // UsernamePasswordAuthenticationFilter 전에 실행하도록 filter chain 등록
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
