package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.chat.dto.ChatDTO;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.entity.ChatTypeEnum;
import com.cupid.joalarm.chat.service.ChatService;
import com.cupid.joalarm.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.cupid.joalarm.chat.entity.ChatTypeEnum.QUIT;
import static com.cupid.joalarm.chat.entity.ChatTypeEnum.TALK;

@RequiredArgsConstructor
@RestController
public class ChatController {
    private final ChatService chatService;
    private final ChatRoomService chatRoomService;

    @MessageMapping("chat/message")
    public void message(ChatDTO message) throws Exception {
        ChatTypeEnum type = message.getType();

        if (QUIT.equals(type)) {
            chatRoomService.reportByRoomSeq(message.getRoomId());
            return;
        }

        if (TALK.equals(type)) {
            chatService.CreateChat(message);
            return;
        }

        // 에러 로그 넣기
    }

    @GetMapping("chat/chatlog")
    public ResponseEntity<List<ChatDTO>> ChatLog(@RequestParam long roomSeq) {
        return new ResponseEntity<>(chatService.getChatList(roomSeq), HttpStatus.OK);
    }
}
