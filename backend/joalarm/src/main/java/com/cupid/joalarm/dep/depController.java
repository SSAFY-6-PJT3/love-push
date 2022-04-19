package com.cupid.joalarm.dep;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class depController {

    @GetMapping("/test")
    public String test() {
        return "TEST SUCCESS";
    }
}