package com.cupid.joalarm.chatroom.service;

import com.cupid.joalarm.chatroom.entity.ChatRoomEntity;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import com.cupid.joalarm.chatroom.dto.CreateChatRoomDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final SimpMessageSendingOperations messageTemplate;

    @Transactional
    public ResponseEntity<?> CreateChatRoom(CreateChatRoomDTO DTO) {
        long sendUser = DTO.getSendUser();
        long receiveUser = DTO.getReceiveUser();
        long[] users= new long[] {sendUser, receiveUser};

        ChatRoomEntity chatRoomEntity = ChatRoomEntity.builder().userList(users).build();
        chatRoomRepository.save(chatRoomEntity);

        messageTemplate.convertAndSend("/sub/user/" + sendUser, new com.cupid.joalarm.chatroom.dto.SubscribeChatRoomDTO("CHATROOM", receiveUser, chatRoomEntity.getChatroomSeq()));
        messageTemplate.convertAndSend("/sub/user/" + receiveUser, new com.cupid.joalarm.chatroom.dto.SubscribeChatRoomDTO("CHATROOM", sendUser, chatRoomEntity.getChatroomSeq()));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public List<ChatRoomEntity> FindRoom() {
        return chatRoomRepository.findAll();
    }
    public List<ChatRoomEntity> FindMyChatRooms(long user) {
        return chatRoomRepository.findAllByUserListIn(user);
    }

    @Transactional
    public boolean reportByRoomSeq(Long seq) {
        ChatRoomEntity chatRoom = chatRoomRepository.findChatRoomEntityByChatroomSeq(seq);
        if(chatRoom == null) return false;
        chatRoom.setActivate(false);
        chatRoomRepository.save(chatRoom);
        return true;
    }

}
