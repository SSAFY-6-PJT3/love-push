package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.heart.dto.HeartDTO;
import com.cupid.joalarm.heart.dto.HeartTypeDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class HeartController {
    private final SimpMessageSendingOperations messageTemplate;

    @MessageMapping("/heart")
    public void sendHeart(HeartDTO DTO) {
        for (int user: DTO.getReceiveUsers()){
            messageTemplate.convertAndSend("/sub/user/" + user, new HeartTypeDTO("HEART", DTO.getSendUser()));
        }
    }

}
