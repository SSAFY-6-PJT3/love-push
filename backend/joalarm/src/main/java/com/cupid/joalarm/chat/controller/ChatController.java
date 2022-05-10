package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.chat.DTO.ChatMessageDTO;
import com.cupid.joalarm.chat.entity.ChatEntity;
import com.cupid.joalarm.chat.service.ChatService;
import com.cupid.joalarm.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RequiredArgsConstructor
@Controller
public class ChatController {
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    @MessageMapping("chat/message")
    public void message(ChatMessageDTO message) {
        switch (message.getType()) {
            case TALK:
                chatService.CreateChat(message);
                break;
            case QUIT:
                chatService.CreateChat(message);
                chatRoomService.reportByRoomSeq(message.getRoomId());
                break;
            default:
                break;
        }
    }

    @GetMapping("chat/chatlog")
    public ResponseEntity<List<ChatEntity>> ChatLog(@RequestParam long roomSeq) {
        return new ResponseEntity<>(chatService.GetChatLogLimit20(roomSeq), HttpStatus.OK);
    }
}
