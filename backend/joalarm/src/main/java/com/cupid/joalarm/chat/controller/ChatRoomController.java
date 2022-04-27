package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.chat.dto.CreateChatRoomDTO;
import com.cupid.joalarm.chat.dto.SubscribeChatRoomDTO;
import com.cupid.joalarm.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.awt.*;

@RequiredArgsConstructor  // final, NotNull 필드 자동 생성
@Controller
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatRoomRepository chatRoomRepository;
    private final SimpMessageSendingOperations messageTemplate;

    @PostMapping("/room")
    public ResponseEntity<String> createRoom(@RequestBody CreateChatRoomDTO DTO) {
        long n1 = DTO.getSendUser();
        long n2 = DTO.getReceiveUser();
        Point point;
        if (n1 < n2)
            point = new Point((int) n1, (int)n2);
        else
            point = new Point((int) n2, (int)n1);
        long pk = chatRoomRepository.createChatRoom(point);
        messageTemplate.convertAndSend("/sub/user/" + n1, new SubscribeChatRoomDTO("CHATROOM", n2, pk));
        messageTemplate.convertAndSend("/sub/user/" + n2, new SubscribeChatRoomDTO("CHATROOM", n1, pk));
        return ResponseEntity.ok("OK");
    }
}
