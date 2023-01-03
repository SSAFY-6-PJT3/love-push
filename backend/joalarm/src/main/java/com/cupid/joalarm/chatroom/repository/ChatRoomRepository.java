package com.cupid.joalarm.chatroom.repository;

import com.cupid.joalarm.chatroom.entity.Chatroom;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<Chatroom, String> {

    Optional<Chatroom> findBySeq(Long seq);
}
