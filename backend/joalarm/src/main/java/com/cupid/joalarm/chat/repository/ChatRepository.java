package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long>, ChatRepositoryCustom {

}
