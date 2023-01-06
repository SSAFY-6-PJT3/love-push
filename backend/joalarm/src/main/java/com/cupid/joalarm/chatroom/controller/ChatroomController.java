package com.cupid.joalarm.chatroom.controller;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.service.AccountService;
import com.cupid.joalarm.accountChatroom.dto.AccountChatroomDto;
import com.cupid.joalarm.accountChatroom.entity.AccountChatroom;
import com.cupid.joalarm.accountChatroom.service.AccountChatroomService;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.service.ChatroomService;
import com.cupid.joalarm.message.Message;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("chatroom 관련 기능")
@RequiredArgsConstructor
@RestController
@RequestMapping("chatroom")
public class ChatroomController {
    private final ChatroomService chatRoomService;
    private final AccountChatroomService accountChatroomService;
    private final Message message;
    private final AccountService accountService;

    @GetMapping
    @ApiOperation(value = "채팅방 조회", notes = "본인이 속한 모든 채팅방과 해당 채팅방의 최근 채팅 한개를 가져옵니다.")
    public ResponseEntity<?> getChatroom(@RequestParam Long accountSeq) {
        return new ResponseEntity<>(accountChatroomService.findMyChatroomList(accountSeq), HttpStatus.OK);
    }

    public Chatroom createChatroom(long sendAccountSeq, long receiveAccountSeq) {
        Chatroom chatroom = chatRoomService.createChatroom();
        Account sendAccount = accountService.findAccountBySeq(sendAccountSeq);
        Account receiveAccount = accountService.findAccountBySeq(receiveAccountSeq);
        AccountChatroom sendAccountChatroom = accountChatroomService.createAccountChatroom(sendAccount, chatroom);
        AccountChatroom receiveAccountChatroom = accountChatroomService.createAccountChatroom(receiveAccount, chatroom);
        message.createChatroom(sendAccount.getAccountSeq(),
                AccountChatroomDto.fromEntity(chatroom.getSeq(), sendAccountChatroom));
        message.createChatroom(sendAccount.getAccountSeq(),
                AccountChatroomDto.fromEntity(chatroom.getSeq(), receiveAccountChatroom));

        return chatroom;
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
