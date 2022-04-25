package com.cupid.joalarm.accout.controller;

import com.cupid.joalarm.accout.dto.AccountDto;
import com.cupid.joalarm.accout.dto.LoginDto;
import com.cupid.joalarm.accout.dto.TokenDto;
import com.cupid.joalarm.accout.jwt.TokenProvider;
import com.cupid.joalarm.accout.service.AccountService;
import com.cupid.joalarm.util.SecurityUtil;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
        String emojiUrl =accountService.findById(loginDto.getId()).getEmoji();

        return new ResponseEntity<>(new TokenDto(jwt,emojiUrl), HttpStatus.OK);
    }

    @GetMapping("/info")
    public ResponseEntity<AccountDto> getUserFromToken(@RequestHeader String token) {
        Optional<String> currentUsername = securityUtil.getCurrentUsername();
        if(currentUsername== null) return null;
        System.out.println("currentUsername "+currentUsername);
//        System.out.println("token  "+token);

        AccountDto accountDto = accountService.findById(currentUsername.get());
//        System.out.println(accountDto);
        return ResponseEntity.ok(accountDto);
    }
}
