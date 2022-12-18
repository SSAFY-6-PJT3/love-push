package com.cupid.joalarm.chatroom.controller;

import com.cupid.joalarm.chatroom.dto.CreateChatRoomDTO;
import com.cupid.joalarm.chatroom.entity.ChatroomEntity;
import com.cupid.joalarm.chatroom.service.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor  // final, NotNull 필드 자동 생성
@Controller
@RequestMapping("chat")
public class ChatRoomController {
    private final ChatRoomService chatRoomService;


    @PostMapping("room")
    public ResponseEntity<?> createRoom(@RequestBody CreateChatRoomDTO DTO) {
        return chatRoomService.CreateChatRoom(DTO);
    }

    @GetMapping("findroom")
    public ResponseEntity<List<ChatroomEntity>> findRoom() {
        return new ResponseEntity<>(chatRoomService.FindRoom(), HttpStatus.OK);
    }

    @GetMapping("findmyroom")
    public ResponseEntity<List<ChatroomEntity>> findMyRoom(@RequestParam long user) {
        return new ResponseEntity<>(chatRoomService.FindMyChatRooms(user), HttpStatus.OK);
    }
}
