package com.cupid.joalarm.accout.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class BearerAuthInterceptor implements HandlerInterceptor {
    private static final Logger logger = LoggerFactory.getLogger(BearerAuthInterceptor.class);

    private AuthorizationExtractor authorizationExtractor;
    private TokenProvider tokenProvider;

    public BearerAuthInterceptor(AuthorizationExtractor authorizationExtractor, TokenProvider tokenProvider){
        this.authorizationExtractor = authorizationExtractor;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler){
        logger.info(">>> interceptor.preHandle 호출");
        System.out.println(">>> interceptor.preHandle 호출");
        String token = authorizationExtractor.extract(request, "Bearer");
        if(token.isEmpty()) throw new IllegalArgumentException("유효하지 않은 토큰"); //throw new TokenEmptyException();
        if(!tokenProvider.validateToken(token)) throw new IllegalArgumentException("유효하지 않은 토큰");
        String id = tokenProvider.getAuthentication(token).getName();
        request.setAttribute("id",id);
        logger.debug("id");
        System.out.println("prehandler");
       return true;
    }

}
