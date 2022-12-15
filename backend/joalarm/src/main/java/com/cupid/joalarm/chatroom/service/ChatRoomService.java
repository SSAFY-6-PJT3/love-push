package com.cupid.joalarm.chatroom.service;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.account_chatroom.entity.AccountChatroom;
import com.cupid.joalarm.account_chatroom.entity.AccountChatroomEmbedded;
import com.cupid.joalarm.account_chatroom.repository.AccountChatroomRepository;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import com.cupid.joalarm.chatroom.dto.CreateChatRoomDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatRoomService {
    private final ChatRoomRepository chatRoomRepository;
    private final AccountChatroomRepository accountChatroomRepository;
    private final AccountRepository accountRepository;
    private final SimpMessageSendingOperations messageTemplate;

    @Transactional
    public Chatroom CreateChatRoom(Long sendAccountSeq, Long receiveAccountSeq) {

        Optional<Account> sendAccountOptional = accountRepository.findAccountByAccountSeq(sendAccountSeq);
        if (sendAccountOptional.isEmpty()) {
            return new Chatroom(null, false);
        }

        Account sendAccount = sendAccountOptional.get();

        Optional<Account> receiveAccountOptional = accountRepository.findAccountByAccountSeq(receiveAccountSeq);
        if (receiveAccountOptional.isEmpty()) {
            return new Chatroom(null, false);
        }

        Chatroom chatRoom = Chatroom.builder().build();
        chatRoomRepository.save(chatRoom);

        Account receiveAccount = receiveAccountOptional.get();

        AccountChatroom firstAccountChatroom = AccountChatroom.builder()
                .accountChatroomEmbedded(new AccountChatroomEmbedded(sendAccount, chatRoom))
                .build();

        AccountChatroom secondAccountChatroom = AccountChatroom.builder()
                .accountChatroomEmbedded(new AccountChatroomEmbedded(receiveAccount, chatRoom))
                .build();

        accountChatroomRepository.save(firstAccountChatroom);
        accountChatroomRepository.save(secondAccountChatroom);

        messageTemplate.convertAndSend("/sub/user/" + sendAccountSeq,
                new com.cupid.joalarm.chatroom.dto.SubscribeChatRoomDTO(
                        "CHATROOM", receiveAccountSeq, chatRoom.getSeq()));
        messageTemplate.convertAndSend("/sub/user/" + receiveAccountSeq,
                new com.cupid.joalarm.chatroom.dto.SubscribeChatRoomDTO(
                        "CHATROOM", sendAccountSeq, chatRoom.getSeq()));

        return chatRoom;
    }

    @Transactional
    public boolean reportByRoomSeq(Long seq) {
        Optional<Chatroom> chatRoomOptional = chatRoomRepository.findBySeq(seq);

        if (chatRoomOptional.isEmpty()) {
            return false;
        }

        Chatroom chatroom = chatRoomOptional.get();
        chatroom.setActivate(false);

        return true;
    }

}
