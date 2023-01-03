package com.cupid.joalarm.chatroom.repository;

import com.cupid.joalarm.chatroom.entity.ChatRoomEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoomEntity, String> {
    List<ChatRoomEntity> findAllByUserListIn(long user);
    List<ChatRoomEntity> findAll();
    ChatRoomEntity findChatRoomEntityByChatroomSeq(long seq);
    Boolean findFirstByUserList(long[] userList);
}
