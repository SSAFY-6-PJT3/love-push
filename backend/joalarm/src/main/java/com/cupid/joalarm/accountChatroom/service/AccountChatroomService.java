package com.cupid.joalarm.accountChatroom.service;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.accountChatroom.dto.AccountChatroomDto;
import com.cupid.joalarm.accountChatroom.entity.AccountChatroom;
import com.cupid.joalarm.accountChatroom.entity.AccountChatroomEmbedded;
import com.cupid.joalarm.accountChatroom.repository.AccountChatroomRepository;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountChatroomService {

    private final AccountChatroomRepository accountChatroomRepository;
    private final AccountRepository accountRepository;
    private final ChatRoomRepository chatRoomRepository;

    @Transactional(readOnly = true)
    public List<Long> findChatroomSeqWith(Long mySeq, Long otherPersonSeq) {
        return accountChatroomRepository.findChatroomSeqWith(mySeq, otherPersonSeq);
    }

    @Transactional(readOnly = true)
    public List<AccountChatroomDto> findMyChatroomList(Long accountSeq) {
        return accountChatroomRepository.findMyChatroomList(accountSeq);
    }

    @Transactional
    public Long updateLastViewChatSeq(Long accountSeq, Long chatroomSeq, Long chatSeq) {
        Account account = getAccount(accountSeq);
        Chatroom chatroom = getChatroom(chatroomSeq);
        AccountChatroom accountChatroom = getAccountChatroom(account, chatroom);

        accountChatroom.setLastViewChatSeq(chatSeq);
        return accountChatroom.getLastViewChatSeq();
    }

    private Account getAccount(Long accountSeq) {
        return accountRepository.findAccountByAccountSeq(accountSeq)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 account입니다."));
    }

    private Chatroom getChatroom(Long chatroomSeq) {
        return chatRoomRepository.findBySeq(chatroomSeq)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 chatroom입니다."));
    }

    private AccountChatroom getAccountChatroom(Account account, Chatroom chatroom) {
        return accountChatroomRepository.findById(
                        new AccountChatroomEmbedded(account, chatroom))
                .orElseThrow(() -> new IllegalArgumentException("생성된 채팅방이 없습니다."));
    }

    @Transactional
    public String updateChatroomName(Long accountSeq, Long chatroomSeq, String name) {
        Account account = getAccount(accountSeq);
        Chatroom chatroom = getChatroom(chatroomSeq);
        AccountChatroom accountChatroom = getAccountChatroom(account, chatroom);

        accountChatroom.setName(name);
        return accountChatroom.getName();
    }

    @Transactional
    public AccountChatroom createAccountChatroom(Account account, Chatroom chatroom) {
        AccountChatroom accountChatroom = AccountChatroom.builder()
                .accountChatroomEmbedded(new AccountChatroomEmbedded(account, chatroom))
                .build();

        return accountChatroomRepository.save(accountChatroom);
    }
}
