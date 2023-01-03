package com.cupid.joalarm.chatroom.controller;

import com.cupid.joalarm.chatroom.dto.CreateChatroomDto;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor  // final, NotNull 필드 자동 생성
@Controller
@RequestMapping("chatroom")
public class ChatroomController {
    private final ChatroomService chatRoomService;


    @PostMapping("room")
    public ResponseEntity<?> createRoom(@RequestBody CreateChatroomDto DTO) {
        return new ResponseEntity<>(chatRoomService.CreateChatRoom(DTO.getSendAccountSeq(), DTO.getReceiveAccountSeq()),
                HttpStatus.OK);
    }
}
