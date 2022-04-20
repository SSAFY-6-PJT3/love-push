package com.cupid.joalarm.accout.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api("account 관련 기능")
@RestController
@RequestMapping("accountsTest")
@RequiredArgsConstructor
public class AccountController {
    @GetMapping()
    public ResponseEntity<String> hello(){
        return ResponseEntity.ok("hello");
    }
}
