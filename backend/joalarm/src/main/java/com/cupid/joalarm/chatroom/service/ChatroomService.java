package com.cupid.joalarm.chatroom.service;

import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ChatroomService {

    private final ChatRoomRepository chatRoomRepository;

    @Transactional
    public Chatroom createChatroom() {
        Chatroom chatRoom = Chatroom.builder().build();
        return chatRoomRepository.save(chatRoom);
    }

    @Transactional
    public boolean reportByRoomSeq(Long seq) {
        Optional<Chatroom> chatRoomOptional = chatRoomRepository.findBySeq(seq);

        if (chatRoomOptional.isEmpty()) {
            return false;
        }

        Chatroom chatroom = chatRoomOptional.get();
        chatroom.setActivate(false);

        return true;
    }

}
