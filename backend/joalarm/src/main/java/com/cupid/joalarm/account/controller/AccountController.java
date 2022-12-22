package com.cupid.joalarm.account.controller;

import com.cupid.joalarm.account.dto.*;
import com.cupid.joalarm.account.jwt.TokenProvider;
import com.cupid.joalarm.account.service.AccountService;
import com.cupid.joalarm.school.SchoolService;
import com.cupid.joalarm.util.MessageResponse;
import com.cupid.joalarm.util.SecurityUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
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
    private final SchoolService schoolService;

    @PostMapping
    public ResponseEntity<AccountDto> signup(@Valid @RequestBody AccountDto accountDto) {
        return ResponseEntity.ok(accountService.signup(accountDto));
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> authorize(@Valid @RequestBody LoginDto loginDto) {
        Long accountSeq = accountService.findSeqById(loginDto.getId());

        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(accountSeq, loginDto.getPassword());

        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.createToken(authentication);
        String emojiUrl = accountService.findBySeq(accountSeq).getEmoji();

        Long schoolSeqBySeq = accountService.findSchoolSeqBySeq(accountSeq);
        String schoolNameBySeq = accountService.findSchoolNameBySeq(accountSeq);

        return new ResponseEntity<>(new TokenDto(accountSeq,jwt, emojiUrl, schoolSeqBySeq, schoolNameBySeq), HttpStatus.OK);
    }

    @GetMapping("/info")
    @ApiOperation(value = "토큰으로 유저 조회 test", notes = "토큰 정보로 유저 정보를 조회합니다.")
    public ResponseEntity<AccountDto> getUserFromToken(@RequestHeader String token) {
        Optional<String> seqId = securityUtil.getCurrentUsername();
        if (seqId == null) return null;

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
        System.out.println("seqId = " + seqId);
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

    @GetMapping
    @ApiOperation(value = "아이디 중복 검사", notes = "아이디 중복 검사, 아이디 사용가능하다면 200, 중복된 아이디가 잇을경우 409 상태코드를 보낸다.")
    public ResponseEntity<MessageResponse> isValidate(@RequestParam String id){
        HttpHeaders resHeaders = new HttpHeaders();
        resHeaders.add("Content-Type", "application/json;charset=UTF-8");
        if(accountService.existAccountById(id)) return new ResponseEntity<>(new MessageResponse("중복된 아이디 입니다"),resHeaders,HttpStatus.CONFLICT);
        else return new ResponseEntity<>(new MessageResponse("사용 가능한 아이디입니다."),resHeaders,HttpStatus.OK);

    }


}
