package com.cupid.joalarm.accout.controller;

import com.cupid.joalarm.accout.dto.AccountDto;
import com.cupid.joalarm.accout.dto.EmojiDto;
import com.cupid.joalarm.accout.dto.LoginDto;
import com.cupid.joalarm.accout.dto.TokenDto;
import com.cupid.joalarm.accout.jwt.TokenProvider;
import com.cupid.joalarm.accout.service.AccountService;
import com.cupid.joalarm.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
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
        String emojiUrl = accountService.findById(loginDto.getId()).getEmoji();

        return new ResponseEntity<>(new TokenDto(jwt, emojiUrl), HttpStatus.OK);
    }

    @GetMapping("/info")
    @ApiOperation(value = "토큰으로 유저 조회 test", notes = "토큰 정보로 유저 정보를 조회합니다.")
    public ResponseEntity<AccountDto> getUserFromToken(@RequestHeader String token) {
        Optional<String> currentUsername = securityUtil.getCurrentUsername();
        if (currentUsername == null) return null;
        System.out.println("currentUsername " + currentUsername);
//        System.out.println("token  "+token);

        AccountDto accountDto = accountService.findById(currentUsername.get());
//        System.out.println(accountDto);
        return ResponseEntity.ok(accountDto);
    }

    @PostMapping("/emoji")
    @ApiOperation(value = "해당 유저 emoji 변경", notes = "토큰과 변경할 emoji url을 받아 변경합니다.")
    public ResponseEntity<String> updateEmoji(@RequestHeader String token, @RequestBody EmojiDto emojiDto) {
        Optional<String> id = securityUtil.getCurrentUsername();
        if (id.isEmpty() || emojiDto.getEmojiUrl().isEmpty()) return ResponseEntity.noContent().build();
        String emojiUrl = accountService.updateEmojiById(id.get(), emojiDto.getEmojiUrl());
        return ResponseEntity.ok(emojiUrl);
    }
}
