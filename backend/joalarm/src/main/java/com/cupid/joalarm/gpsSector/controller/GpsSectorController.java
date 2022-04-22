package com.cupid.joalarm.gpsSector.controller;

import com.cupid.joalarm.gpsSector.DTO.JoalarmDTO;
import com.cupid.joalarm.gpsSector.DTO.SectorDTO;
import com.cupid.joalarm.gpsSector.repository.GpsRepository;
import com.cupid.joalarm.gpsSector.scheduler.GpsDataSendScheduler;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class GpsSectorController {
    private final GpsRepository gpsRepository;
    private final GpsDataSendScheduler gpsDataSendScheduler;

    @MessageMapping("/joalarm")
    public void joalarm(JoalarmDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에 넣기만 함
        // 5s 전체채팅 요청
//        System.out.println("joalarm 메세지 확인");
        System.out.println(DTO.getGpsKey());
        gpsRepository.putUserSector(DTO.getGpsKey(), DTO.getPk(), DTO.getEmojiURL());
        gpsDataSendScheduler.setOperationCommand();
    }

    @MessageMapping("/sector")
    public void sector(SectorDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에서 이전 섹터 삭제, 새 섹터 입력
        // 5s 전체채팅 요청
        gpsRepository.changeUserSector(DTO.getBeforeGpsKey(), DTO.getNowGpsKey(), DTO.getPk());
        gpsDataSendScheduler.setOperationCommand();
    }

    @MessageMapping("/emoji")
    public void sector(JoalarmDTO DTO) {
        // 해당 HashMap에서 섹터 -> pk -> 이모지 수정
        // 5s 전체채팅 요청
        gpsRepository.changeUserEmoji(DTO.getGpsKey(), DTO.getPk(), DTO.getEmojiURL());
        gpsDataSendScheduler.setOperationCommand();
    }
}
