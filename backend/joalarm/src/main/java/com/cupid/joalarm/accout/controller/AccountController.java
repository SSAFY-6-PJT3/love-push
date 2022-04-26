package com.cupid.joalarm.accout.controller;

import com.cupid.joalarm.accout.dto.*;
import com.cupid.joalarm.accout.jwt.TokenProvider;
import com.cupid.joalarm.accout.service.AccountService;
import com.cupid.joalarm.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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
        Long accountSeq = accountService.findById(loginDto.getId()).getSeq();
        System.out.println(accountSeq + "accountseq");
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(accountSeq, loginDto.getPassword());
        System.out.println(authenticationToken + "authenticationToken");
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        System.out.println("authentication" + authentication);
        String jwt = tokenProvider.createToken(authentication);
        String emojiUrl = accountService.findBySeq(accountSeq).getEmoji();

        return new ResponseEntity<>(new TokenDto(jwt, emojiUrl), HttpStatus.OK);
    }

    @GetMapping("/info")
    @ApiOperation(value = "토큰으로 유저 조회 test", notes = "토큰 정보로 유저 정보를 조회합니다.")
    public ResponseEntity<AccountDto> getUserFromToken(@RequestHeader String token) {
        Optional<String> seqId = securityUtil.getCurrentUsername();
        if (seqId == null) return null;
        System.out.println("currentUsername " + seqId);
//        System.out.println("token  "+token);

//        AccountDto accountDto = accountService.findById(currentUsername.get());

        AccountDto accountDto = accountService.findBySeq(Long.parseLong(seqId.get()));
//        System.out.println(accountDto);
        return ResponseEntity.ok(accountDto);
    }

    @PostMapping("/emoji")
    @ApiOperation(value = "해당 유저 emoji 변경", notes = "토큰과 변경할 emoji url을 받아 변경합니다.")
    public ResponseEntity<String> updateEmoji(@RequestHeader String token, @RequestBody EmojiDto emojiDto) {
        Optional<String> seqId = securityUtil.getCurrentUsername();
        if (seqId.isEmpty() || emojiDto.getEmojiUrl().isEmpty()) return ResponseEntity.noContent().build();
        Long seq = Long.parseLong(seqId.get());
        String emojiUrl = accountService.updateEmojiById(seq, emojiDto.getEmojiUrl());
        return ResponseEntity.ok(emojiUrl);
    }

    @GetMapping("{user}/emoji")
    @ApiOperation(value = "대상 유저(user)의 이모지 조회", notes = "대상 유저(userSeq)의 이모지 조회")
    public ResponseEntity<String> readEmoji(@PathVariable String user) {
        Long seq = Long.parseLong(user);
        AccountDto accountDto = accountService.findBySeq(seq);

        if (accountDto == null) return ResponseEntity.noContent().build();
        return ResponseEntity.ok(accountDto.getEmoji());
    }

    @PostMapping("report")
    @ApiOperation(value = "대상 유저 신고", notes = "로그인시 사용 가능 \n 신고할 계정 seq 정보를 전달")
    public ResponseEntity<String> reportAccount(@RequestHeader String token, @ApiParam(value = "신고할 user seq", required = true) @RequestBody ReportDto reportDto) {
        Optional<String> seqId = securityUtil.getCurrentUsername();
        if (seqId.isEmpty()) return ResponseEntity.noContent().build();

        Boolean success = accountService.reportBYSeq(reportDto.getReported());
        if (success) return ResponseEntity.ok("Success report");
        else return ResponseEntity.noContent().build();
    }
}
