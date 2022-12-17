package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.heart.dto.SendHeartDTO;
import com.cupid.joalarm.heart.entity.Heart;
import com.cupid.joalarm.heart.service.HeartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import org.springframework.web.bind.annotation.RequestParam;

@Api("heart 관련 기능")
@RequiredArgsConstructor
@Controller
public class HeartController {
    private final HeartService heartService;

    @ApiOperation(value = "하트 송신", notes = "하트를 보냅니다.")
    @MessageMapping("/heart")
    public void sendHeart(SendHeartDTO DTO) {
        heartService.sendHeart(DTO.getSendUser(), DTO.getSessionAccountHashMap());
    }

    @ApiOperation(value = "하트 보낸 리스트 조회", notes = "하트를 보낸 유저들을 조회합니다.")
    @GetMapping("/heart/send_list")
    public ResponseEntity<List<Long>> sendHeartList(@RequestParam("user") long seq) {
        return new ResponseEntity<>(heartService.SendHeartList(seq), HttpStatus.OK);
    }

}
