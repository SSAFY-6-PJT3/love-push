package com.cupid.joalarm.gpsSector.controller;

import com.cupid.joalarm.gpsSector.dto.EmojiDTO;
import com.cupid.joalarm.gpsSector.dto.SectorDTO;
import com.cupid.joalarm.gpsSector.service.GpsService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class GpsSectorController {

    private final GpsService gpsService;

    @MessageMapping("/sector")
    public void sector(@Header("simpSessionId") String sessionId, SectorDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에서 이전 섹터 삭제, 새 섹터 입력
        // 5s 전체채팅 요청
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", DTO.getNowGpsKey());
        SimpAttributesContextHolder.currentAttributes().setAttribute("INFO", DTO.getAccountInfoDto());
        gpsService.changeUserSector(DTO.getBeforeGpsKey(), DTO.getNowGpsKey(), sessionId);
    }

    @MessageMapping("/emoji")
    public void sector(@Header("simpSessionId") String sessionId, EmojiDTO DTO) {
        // 해당 HashMap에서 섹터 -> pk -> 이모지 수정
        // 5s 전체채팅 요청
        gpsService.changeUserEmoji(DTO.getGpsKey(), sessionId, DTO.getEmojiURL());
    }
}
