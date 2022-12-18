package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.entity.ChatEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ChatRepository extends MongoRepository<ChatEntity, String> {
    public List<ChatEntity> findTop20ByRoomIdOrderBySendTimeDesc(long roomId);
}
