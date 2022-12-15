package com.cupid.joalarm.chatroom.repository;

import com.cupid.joalarm.chatroom.entity.Chatroom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<Chatroom, Long> {
    Optional<Chatroom> findBySeq(Long seq);
}
