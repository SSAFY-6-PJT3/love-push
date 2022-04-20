package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.chat.DTO.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;

@RequiredArgsConstructor
@Controller
public class ChatController {
    private final SimpMessageSendingOperations messageTemplate;

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (ChatMessage.MessageType.JOIN.equals(message.getType())) {
            message.setMessage((message.getSender() + "님 입장"));
        }
        messageTemplate.convertAndSend("/sub/chat/room/" + message.getRoomId(), message);
    }
}
