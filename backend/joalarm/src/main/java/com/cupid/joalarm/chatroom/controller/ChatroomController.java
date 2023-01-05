package com.cupid.joalarm.chatroom.controller;

import com.cupid.joalarm.chatroom.dto.CreateChatroomDto;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.service.ChatroomService;
import com.cupid.joalarm.chatroom.util.Message;
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
    private final Message message;


    @PostMapping("room")
    public ResponseEntity<?> createRoom(@RequestBody CreateChatroomDto DTO) {
        Chatroom chatroom = chatRoomService.CreateChatRoom(DTO.getSendAccountSeq(), DTO.getReceiveAccountSeq());
        message.createChatroom(DTO.getSendAccountSeq(), chatroom.getSeq());
        message.createChatroom(DTO.getReceiveAccountSeq(), chatroom.getSeq());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
