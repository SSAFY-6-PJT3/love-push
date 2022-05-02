package com.cupid.joalarm.mon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("accounts")
public class MonTestController {

    private MonTestService monTestService;

    @Autowired
    public MonTestController(MonTestService monTestService) {
        this.monTestService = monTestService;
    }

    @PostMapping("/mon/test")
    public ResponseEntity<?> createTest(@RequestBody MonTestDto monTestDto) {
        return monTestService.createTest(monTestDto);
    }

    @GetMapping("/mon/test")
    public MonTestDto returnTestDto(@RequestBody MonTestDto monTestDto) {
        return monTestService.returnTestDto(monTestDto);
    }
}
