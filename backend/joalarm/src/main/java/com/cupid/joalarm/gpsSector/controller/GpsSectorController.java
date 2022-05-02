package com.cupid.joalarm.gpsSector.controller;

import com.cupid.joalarm.gpsSector.dto.EmojiDTO;
import com.cupid.joalarm.gpsSector.dto.JoalarmDTO;
import com.cupid.joalarm.gpsSector.dto.SectorDTO;
import com.cupid.joalarm.gpsSector.service.GpsService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@RequestMapping("api/accounts")
@Controller
public class GpsSectorController {
    private final GpsService gpsService;


    @MessageMapping("/joalarm")
    public void joalarm(@Header("simpSessionId") String sessionId, JoalarmDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에 넣기만 함
        // 5s 전체채팅 요청
//        System.out.println("joalarm 메세지 확인");
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", DTO.getGpsKey());
        gpsService.putUserSector(DTO.getGpsKey(), sessionId, DTO.getPair());

    }

    @MessageMapping("/sector")
    public void sector(@Header("simpSessionId") String sessionId, SectorDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에서 이전 섹터 삭제, 새 섹터 입력
        // 5s 전체채팅 요청
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", DTO.getNowGpsKey());
        System.out.println(DTO.getBeforeGpsKey() + " / " + DTO.getNowGpsKey() + " / " + sessionId);
        gpsService.changeUserSector(DTO.getBeforeGpsKey(), DTO.getNowGpsKey(), sessionId);
    }

    @MessageMapping("/emoji")
    public void sector(@Header("simpSessionId") String sessionId, EmojiDTO DTO) {
        // 해당 HashMap에서 섹터 -> pk -> 이모지 수정
        // 5s 전체채팅 요청
        gpsService.changeUserEmoji(DTO.getGpsKey(), sessionId, DTO.getEmojiURL());
    }

    @MessageMapping("/disconnect")
    public void disconnect(String test) {
        System.out.println(test);
//        gpsService.dropUser(gpsKey, sessionId);
    }
//    public void disconnect(EmojiDTO DTO) {
//        System.out.println("DISCONNECT");
//        gpsRepository.dropUser(DTO.getGpsKey(), DTO.getUuid());
//        gpsDataSendScheduler.setOperationCommand();
//    }
}
