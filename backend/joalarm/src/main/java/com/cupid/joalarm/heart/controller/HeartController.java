package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.heart.dto.SendHeartDTO;
import com.cupid.joalarm.heart.entity.Heart;
import com.cupid.joalarm.heart.service.HeartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class HeartController {
    private final HeartService heartService;

    @MessageMapping("/heart")
    public void sendHeart(SendHeartDTO DTO) {
        heartService.sendHeart(DTO.getSendUser(), DTO.getSessionAccountHashMap());
    }

    @GetMapping("/heart/sendheartlist")
    public ResponseEntity<List<Long>> sendHeartList(long seq) {
        return new ResponseEntity<>(heartService.SendHeartList(seq), HttpStatus.OK);
    }

}
