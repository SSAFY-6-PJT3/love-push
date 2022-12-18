package com.cupid.joalarm.chat.service;

import com.cupid.joalarm.chat.DTO.ChatMessageDTO;
import com.cupid.joalarm.chat.entity.ChatEntity;
import com.cupid.joalarm.chat.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final SimpMessageSendingOperations messageTemplate;
    private final ChatRepository chatRepository;

    @Transactional
    public void CreateChat(ChatMessageDTO DTO) {
        String pattern = "yyyy-MM-dd a KK:mm ss:SSS";
        DateFormat df = new SimpleDateFormat(pattern);
        ChatEntity chatEntity = ChatEntity.builder()
                .type(DTO.getType())
                .roomId(DTO.getRoomId())
                .sender(DTO.getSender())
                .message(DTO.getMessage())
                .sendTime(df.format(new Date()))
                .build();
        chatRepository.save(chatEntity);
        messageTemplate.convertAndSend("/sub/chat/room/" + DTO.getRoomId(), chatEntity);
    }

    @Transactional
    public List<ChatEntity> GetChatLogLimit20(long roomSeq) {
        return chatRepository.findTop20ByRoomIdOrderBySendTimeDesc(roomSeq);
    }
}
