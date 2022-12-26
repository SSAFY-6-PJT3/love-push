package com.cupid.joalarm.gpsSector.controller;

import com.cupid.joalarm.gpsSector.dto.AccountInfoDto;
import com.cupid.joalarm.gpsSector.dto.SectorDTO;
import com.cupid.joalarm.gpsSector.service.GpsService;
import com.cupid.joalarm.love.entity.Love;
import com.cupid.joalarm.love.service.LoveService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpAttributes;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class GpsSectorController {

    private final GpsService gpsService;
    private final LoveService loveService;

    @MessageMapping("/init")
    public void init(@Header("simpSessionId") Long accountSeq) {
        SimpAttributes simpAttributes = SimpAttributesContextHolder.currentAttributes();
        simpAttributes.setAttribute("SEQ", accountSeq);
        simpAttributes.setAttribute("INFO", createInfo(loveService.getLove(accountSeq)));
    }

    private AccountInfoDto createInfo(Optional<Love> love) {
        AccountInfoDto accountInfoDto = new AccountInfoDto();
        love.ifPresent(accountInfoDto::update);
        return accountInfoDto;
    }

    @MessageMapping("/sector")
    public void sector(@Header("simpSessionId") String sessionId, SectorDTO DTO) {
        // gps 데이터 전달받음
        // 해당 HashMap에서 이전 섹터 삭제, 새 섹터 입력
        // 5s 전체채팅 요청
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", DTO.getNowGpsKey());
        gpsService.changeUserSector(DTO.getBeforeGpsKey(), DTO.getNowGpsKey(), sessionId);
    }
}
