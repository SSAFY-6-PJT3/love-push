package com.cupid.joalarm.gpsSector.controller;

import com.cupid.joalarm.gpsSector.dto.EmojiDTO;
import com.cupid.joalarm.gpsSector.dto.JoalarmDTO;
import com.cupid.joalarm.gpsSector.dto.SectorDTO;
import com.cupid.joalarm.gpsSector.repository.GpsRepository;
import com.cupid.joalarm.gpsSector.scheduler.GpsDataSendScheduler;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class GpsSectorController {
    private final GpsRepository gpsRepository;
    private final GpsDataSendScheduler gpsDataSendScheduler;

    @MessageMapping("/joalarm")
    public void joalarm(@Header("simpSessionId") String sessionId, JoalarmDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에 넣기만 함
        // 5s 전체채팅 요청
//        System.out.println("joalarm 메세지 확인");
        gpsRepository.putUserSector(DTO.getGpsKey(), sessionId, DTO.getPair());
        gpsDataSendScheduler.setOperationCommand();
    }

    @MessageMapping("/sector")
    public void sector(@Header("simpSessionId") String sessionId, SectorDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에서 이전 섹터 삭제, 새 섹터 입력
        // 5s 전체채팅 요청
        gpsRepository.changeUserSector(DTO.getBeforeGpsKey(), DTO.getNowGpsKey(), sessionId);
        gpsDataSendScheduler.setOperationCommand();
    }

    @MessageMapping("/emoji")
    public void sector(@Header("simpSessionId") String sessionId, EmojiDTO DTO) {
        // 해당 HashMap에서 섹터 -> pk -> 이모지 수정
        // 5s 전체채팅 요청
        gpsRepository.changeUserEmoji(DTO.getGpsKey(), sessionId, DTO.getEmojiURL());
        gpsDataSendScheduler.setOperationCommand();
    }

    @MessageMapping("/disconnect")
    public void disconnect() {
        System.out.println("DISCONNECT");
    }
//    public void disconnect(EmojiDTO DTO) {
//        System.out.println("DISCONNECT");
//        gpsRepository.dropUser(DTO.getGpsKey(), DTO.getUuid());
//        gpsDataSendScheduler.setOperationCommand();
//    }
}
