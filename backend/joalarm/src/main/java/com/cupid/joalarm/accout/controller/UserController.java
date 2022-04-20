package com.cupid.joalarm.accout.controller;

import com.cupid.joalarm.accout.dto.UserDto;
import com.cupid.joalarm.accout.entity.User;
import com.cupid.joalarm.accout.service.UserService;
import io.swagger.annotations.Api;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Api("user 관련 기능")
@RestController
@RequestMapping("accounts")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDto > signup(@Valid @RequestBody UserDto userDto){
        return ResponseEntity.ok(userService.signup(userDto));
    }
    @GetMapping("/user")
    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    public ResponseEntity<User> getMyUserInfo() {
        return ResponseEntity.ok(userService.getMyUserWithAuthorities().get());
    }

    @GetMapping("/user/{username}")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<User> getMyUserInfo(@PathVariable String username) {
        return ResponseEntity.ok(userService.getUserWithAuthorities(username).get());
    }
}

