package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.dto.ChatDTO;
import com.cupid.joalarm.chat.dto.ChatSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ChatRepositoryCustom {
    List<ChatDTO> getChatList(Long roomSeq, Long chatSeq);
}
