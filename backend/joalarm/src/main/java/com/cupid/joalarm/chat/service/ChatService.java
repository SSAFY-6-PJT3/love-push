package com.cupid.joalarm.chat.service;

import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.chat.dto.ChatDto;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.repository.ChatRepository;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository chatRepository;
    private final AccountRepository accountRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public Chat createChat(ChatDto chatDto) {
        Chat chat = Chat.builder()
                .account(accountRepository.findAccountByAccountSeq(chatDto.getSendAccountSeq())
                        .orElseThrow(() -> new IllegalArgumentException("User pk is not in table")))
                .chatroom(chatRoomRepository.findBySeq(chatDto.getChatroomSeq())
                        .orElseThrow(() -> new IllegalArgumentException("Chatroom pk is not in table")))
                .message(chatDto.getMessage())
                .build();

        chatRepository.save(chat);
        return chat;
    }

    @Transactional
    public List<ChatDto> getChatList(long roomSeq, long chatSeq) {
        return chatRepository.getChatList(roomSeq, chatSeq);
    }
}
