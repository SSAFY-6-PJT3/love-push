package com.cupid.joalarm.chat.service;

import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.chat.dto.ChatDTO;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.repository.ChatRepository;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final SimpMessageSendingOperations messageTemplate;
    private final ChatRepository chatRepository;
    private final AccountRepository accountRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public Chat CreateChat(ChatDTO DTO) {
        Chat chat = Chat.builder()
                .account(accountRepository.findAccountByAccountSeq(DTO.getSender())
                        .orElseThrow(() -> new IllegalArgumentException("User pk is not in table")))
                .chatroom(chatRoomRepository.findById(DTO.getRoomId())
                        .orElseThrow(() -> new IllegalArgumentException("Chatroom pk is not in table")))
                .message(DTO.getMessage())
                .chatType(DTO.getType())
                .build();

        chatRepository.save(chat);
        messageTemplate.convertAndSend("/sub/chat/room/" + DTO.getRoomId(), chat);
        return chat;
    }

    @Transactional
    public List<ChatDTO> getChatList(long roomSeq) {
        return chatRepository.getChatList(roomSeq);
    }
}
