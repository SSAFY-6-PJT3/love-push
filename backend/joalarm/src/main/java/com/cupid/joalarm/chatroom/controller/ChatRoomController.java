package com.cupid.joalarm.chatroom.controller;

import com.cupid.joalarm.chatroom.dto.CreateChatRoomDTO;
import com.cupid.joalarm.chatroom.service.ChatRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api("chatroom 관련 기능")
@RequiredArgsConstructor
@RestController
@RequestMapping("chatroom")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @ApiOperation(value = "채팅방 조회", notes = "채팅방을 조회합니다. 채팅방 seq, 채팅방 이름, 마지막 채팅, 읽지 않은 채팅 수를 가져옵니다.")
    @GetMapping("/list")
    public ResponseEntity<?> chatroomList(@RequestParam("user") Long accountSeq) {
        return new ResponseEntity<>(chatRoomService.findChatroomList(accountSeq), HttpStatus.OK);
    }

    @ApiOperation(value = "채팅방 생성", notes = "채팅방을 생성합니다.")
    @PostMapping
    public ResponseEntity<?> createRoom(@RequestBody CreateChatRoomDTO DTO) {
        return new ResponseEntity<>(chatRoomService.CreateChatRoom(DTO.getSendAccountSeq(), DTO.getReceiveAccountSeq()),
                HttpStatus.OK);
    }
}
