package com.cupid.joalarm.account_chatroom.repository;

import com.cupid.joalarm.account_chatroom.dto.AccountChatroomDTO;

import java.util.List;

public interface AccountChatroomRepositoryCustom {
    List<AccountChatroomDTO> findChatroomList(Long accountSeq);
}
