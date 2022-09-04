package com.cupid.joalarm.chatroom.repository;

import com.cupid.joalarm.chatroom.entity.ChatroomEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRoomRepository extends MongoRepository<ChatroomEntity, String> {
    public List<ChatroomEntity> findAllByUserListIn(long user);
    public List<ChatroomEntity> findAll();
    public ChatroomEntity findChatRoomEntityByChatroomSeq(long seq);
}
