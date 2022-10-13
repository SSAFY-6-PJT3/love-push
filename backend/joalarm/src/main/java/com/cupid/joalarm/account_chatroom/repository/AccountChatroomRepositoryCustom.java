package com.cupid.joalarm.account_chatroom.repository;

import com.cupid.joalarm.account_chatroom.dto.AccountChatroomDTO;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AccountChatroomRepositoryCustom {
    List<AccountChatroomDTO> findMyChatroomList(Long accountSeq);
}
