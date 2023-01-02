package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.dto.ChatDto;
import java.util.List;

public interface ChatRepositoryCustom {
    List<ChatDto> getChatList(Long roomSeq, Long chatSeq);
}
