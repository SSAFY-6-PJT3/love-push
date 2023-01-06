package com.cupid.joalarm.chat.controller;

import com.cupid.joalarm.accountChatroom.repository.AccountChatroomRepository;
import com.cupid.joalarm.chat.dto.ChatDto;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.service.ChatService;
import com.cupid.joalarm.message.Message;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    private final Message message;
    private final AccountChatroomRepository accountChatroomRepository;

    @MessageMapping("chat/message")
    public void message(ChatDto chatDto) {
        try {
            Chat chat = chatService.createChat(chatDto);

            accountChatroomRepository.findAccountsInChatroom(chatDto.getChatroomSeq())
                    .forEach(accountSeq -> {
                        message.chat(accountSeq, new ChatDto(chatDto.getChatroomSeq(), chat));
                    });

        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    @GetMapping("chat/chatlog")
    public ResponseEntity<List<ChatDto>> ChatLog(@RequestParam long roomSeq, @RequestParam long chatSeq) {
        return new ResponseEntity<>(chatService.getChatList(roomSeq, chatSeq), HttpStatus.OK);
    }
}