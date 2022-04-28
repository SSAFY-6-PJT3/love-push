package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.dto.ChatRoomDTO;
import com.cupid.joalarm.chat.entity.ChatRoomEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import javax.annotation.PostConstruct;
import java.util.*;
import java.util.List;

public interface ChatRoomRepository extends MongoRepository<ChatRoomEntity, String> {
    public List<ChatRoomEntity> findAllByUserListIn(long user);
    public List<ChatRoomEntity> findAll();
}
