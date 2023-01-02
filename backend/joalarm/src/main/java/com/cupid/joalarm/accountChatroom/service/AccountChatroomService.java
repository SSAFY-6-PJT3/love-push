package com.cupid.joalarm.accountChatroom.service;

import com.cupid.joalarm.accountChatroom.repository.AccountChatroomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountChatroomService {
    private final AccountChatroomRepository accountChatroomRepository;

    public List<Long> findChatroomSeqWith(Long mySeq, Long otherPersonSeq) {
        return accountChatroomRepository.findChatroomSeqWith(mySeq, otherPersonSeq);
    }
}
