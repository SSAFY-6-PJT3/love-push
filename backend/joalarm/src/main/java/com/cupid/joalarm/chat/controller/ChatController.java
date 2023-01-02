package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.chat.dto.ChatDto;
import com.cupid.joalarm.chat.service.ChatService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    private final SimpMessageSendingOperations messageTemplate;

    @MessageMapping("chat/message")  // 메시지 전송과 신고, 방 나가기에 대해 따로 정의할 것
    public void message(ChatDto chatDto) {
        try {
            messageTemplate.convertAndSend("/sub/chat/room/" + chatDto.getRoomSeq(),
                    new ChatDto(chatDto.getRoomSeq(), chatService.CreateChat(chatDto)));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    @GetMapping("chat/chatlog")
    public ResponseEntity<List<ChatDto>> ChatLog(@RequestParam long roomSeq, @RequestParam long chatSeq) {
        return new ResponseEntity<>(chatService.getChatList(roomSeq, chatSeq), HttpStatus.OK);
    }
}