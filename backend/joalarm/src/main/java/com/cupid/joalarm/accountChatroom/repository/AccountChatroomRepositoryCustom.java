package com.cupid.joalarm.accountChatroom.repository;

import com.cupid.joalarm.accountChatroom.dto.AccountChatroomDto;
import java.util.List;

public interface AccountChatroomRepositoryCustom {
    List<AccountChatroomDto> findMyChatroomList(Long accountSeq);
}
