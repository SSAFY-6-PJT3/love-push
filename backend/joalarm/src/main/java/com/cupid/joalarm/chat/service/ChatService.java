package com.cupid.joalarm.chat.service;

import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.chat.dto.ChatDTO;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.repository.ChatRepository;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final SimpMessageSendingOperations messageTemplate;
    private final ChatRepository chatRepository;
    private final AccountRepository accountRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public void CreateChat(ChatDTO DTO) throws Exception {
//        String pattern = "yyyy-MM-dd a KK:mm ss:SSS";
//        DateFormat df = new SimpleDateFormat(pattern);
        Chat chatEntity = Chat.builder()
                .account(accountRepository.findAccountByAccountSeq(DTO.getSender()).orElseThrow(() -> new Exception("User pk is not in table")))
                .chatroom(chatRoomRepository.findById(DTO.getRoomId()).orElseThrow(() -> new Exception("Chatroom pk is not in table")))
                .build();
        chatRepository.save(chatEntity);
        messageTemplate.convertAndSend("/sub/chat/room/" + DTO.getRoomId(), chatEntity);
    }

    @Transactional
    public List<ChatDTO> getChatList(long roomSeq) {
        return chatRepository.getChatList(roomSeq);
    }
}
