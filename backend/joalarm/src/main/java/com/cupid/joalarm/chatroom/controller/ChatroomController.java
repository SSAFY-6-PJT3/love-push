package com.cupid.joalarm.chatroom.controller;

import com.cupid.joalarm.accountChatroom.service.AccountChatroomService;
import com.cupid.joalarm.chatroom.dto.CreateChatroomDto;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.service.ChatroomService;
import com.cupid.joalarm.message.Message;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Api("chatroom 관련 기능")
@RequiredArgsConstructor
@RestController
@RequestMapping("chatroom")
public class ChatroomController {
    private final ChatroomService chatRoomService;
    private final AccountChatroomService accountChatroomService;
    private final Message message;

    @GetMapping
    @ApiOperation(value = "채팅방 조회", notes = "본인이 속한 모든 채팅방과 해당 채팅방의 최근 채팅 한개를 가져옵니다.")
    public ResponseEntity<?> getChatroom(@RequestParam Long accountSeq) {
        return new ResponseEntity<>(accountChatroomService.findMyChatroomList(accountSeq), HttpStatus.OK);
    }

    @PostMapping()
    @ApiOperation(value = "채팅방 생성", notes = "다른 유저와의 채팅방을 생성합니다.")
    public ResponseEntity<?> createRoom(@RequestBody CreateChatroomDto DTO) {
        Chatroom chatroom = chatRoomService.CreateChatRoom(DTO.getSendAccountSeq(), DTO.getReceiveAccountSeq());
        message.createChatroom(DTO.getSendAccountSeq(), chatroom.getSeq());
        message.createChatroom(DTO.getReceiveAccountSeq(), chatroom.getSeq());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("view")
    @ApiOperation(value = "마지막 확인 채팅 기록", notes = "마지막으로 확인한 채팅을 기록합니다.")
    public ResponseEntity<?> updateLastViewChat(
            @RequestBody Long accountSeq, @RequestBody Long chatroomSeq, @RequestBody Long chatSeq) {
        return new ResponseEntity<>(
                accountChatroomService.updateLastViewChatSeq(accountSeq, chatroomSeq, chatSeq), HttpStatus.OK);
    }

    @PostMapping("name")
    @ApiOperation(value = "채팅방 이름 변경", notes = "채팅방의 이름을 유저가 원하는대로 변경합니다.")
    public ResponseEntity<?> updateChatroomName(
            @RequestBody Long accountSeq, @RequestBody Long chatroomSeq, @RequestBody String name) {
        return new ResponseEntity<>(
                accountChatroomService.updateChatroomName(accountSeq, chatroomSeq, name), HttpStatus.OK);
    }
}
