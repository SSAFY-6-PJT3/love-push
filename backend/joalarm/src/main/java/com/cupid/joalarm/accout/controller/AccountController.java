package com.cupid.joalarm.accout.controller;

import com.cupid.joalarm.accout.dto.AccountDto;
import com.cupid.joalarm.accout.dto.LoginDto;
import com.cupid.joalarm.accout.dto.TokenDto;
import com.cupid.joalarm.accout.jwt.JwtFilter;
import com.cupid.joalarm.accout.jwt.TokenProvider;
import com.cupid.joalarm.accout.service.AccountService;
import com.cupid.joalarm.accout.service.CustomUserDetailsService;
import com.cupid.joalarm.util.SecurityUtil;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.Optional;

@Api("account 관련 기능")
@RestController
@RequestMapping("accounts")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final CustomUserDetailsService customUserDetailsService;
    private final SecurityUtil securityUtil;

    @PostMapping
    public ResponseEntity<AccountDto> signup(@Valid @RequestBody AccountDto accountDto) {
        return ResponseEntity.ok(accountService.signup(accountDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getId(), loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + jwt);

        return new ResponseEntity<>(new TokenDto(jwt), httpHeaders, HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<AccountDto> getUserFromToken(HttpServletRequest request) {
        Optional<String> currentUsername = securityUtil.getCurrentUsername();
        if(currentUsername== null) return null;
        System.out.println("currentUsername "+currentUsername);
        System.out.println("info");
        System.out.println(request.toString());
        System.out.println("Principal "+request.getUserPrincipal());
        System.out.println();
        String token = (String) request.getAttribute("Authorization");
        System.out.println("token  "+token);
//        String id = tokenProvider.getAuthentication(request.getAttribute("token").toString()).getName();

        AccountDto accountDto = accountService.findById(currentUsername.get());
        System.out.println(accountDto);
        return ResponseEntity.ok(accountDto);
    }
}
