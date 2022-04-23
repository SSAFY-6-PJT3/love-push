package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.chat.DTO.ChatMessageDTO;
import com.cupid.joalarm.heart.DTO.HeartDTO;
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
        for (int user: DTO.getUsers()){
            messageTemplate.convertAndSend("/sub/heart/" + user, "Heart");
        }
    }

}
