package com.cupid.joalarm.chatroom.repository;

import com.cupid.joalarm.chatroom.entity.ChatRoomEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoomEntity, String> {
    public List<ChatRoomEntity> findAllByUserListIn(long user);
    public List<ChatRoomEntity> findAll();
    public ChatRoomEntity findChatRoomEntityByChatroomSeq(long seq);
}
