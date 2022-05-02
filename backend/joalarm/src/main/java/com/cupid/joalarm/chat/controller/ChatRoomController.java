package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.chat.dto.CreateChatRoomDTO;
import com.cupid.joalarm.chat.dto.SubscribeChatRoomDTO;
import com.cupid.joalarm.chat.entity.ChatRoomEntity;
import com.cupid.joalarm.chat.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.util.List;

@RequiredArgsConstructor  // final, NotNull 필드 자동 생성
@Controller
@RequestMapping("api/chat")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;


    @PostMapping("api/room")
    public ResponseEntity<?> createRoom(@RequestBody CreateChatRoomDTO DTO) {
        return chatRoomService.CreateChatRoom(DTO);
    }

    @GetMapping("api/findroom")
    public ResponseEntity<List<ChatRoomEntity>> findRoom() {
        return new ResponseEntity<>(chatRoomService.FindRoom(), HttpStatus.OK);
    }

    @GetMapping("api/findmyroom")
    public ResponseEntity<List<ChatRoomEntity>> findMyRoom(@RequestParam long user) {
        return new ResponseEntity<>(chatRoomService.FindMyChatRooms(user), HttpStatus.OK);
    }
}
