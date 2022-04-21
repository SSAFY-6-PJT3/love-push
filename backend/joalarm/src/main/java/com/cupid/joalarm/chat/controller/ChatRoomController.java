package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.chat.DTO.ChatRoom;
import com.cupid.joalarm.chat.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@RequiredArgsConstructor  // final, NotNull 필드 자동 생성
@Controller
@RequestMapping("/chat")
public class ChatRoomController {
    private final ChatRoomRepository chatRoomRepository;

    @PostMapping("/room")
    public ChatRoom createRoom(@RequestBody Map<String, String> map) {
        return ChatRoomRepository.createChatRoom(map.get("name"));
    }
}
