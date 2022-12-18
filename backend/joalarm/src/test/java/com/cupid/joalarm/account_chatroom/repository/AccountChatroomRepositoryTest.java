package com.cupid.joalarm.account_chatroom.repository;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.account_chatroom.dto.AccountChatroomDTO;
import com.cupid.joalarm.account_chatroom.entity.AccountChatroom;
import com.cupid.joalarm.account_chatroom.entity.AccountChatroomEmbedded;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.entity.ChatTypeEnum;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class AccountChatroomRepositoryTest {

    @Autowired AccountRepository accountRepository;
    @Autowired AccountChatroomRepository accountChatroomRepository;
    @Autowired EntityManager em;
    Long account1_seq;
    Long account2_seq;

    @BeforeEach
    public void beforeEach() {
        Account account1 = new Account();
        Account account2 = new Account();
        Account account3 = new Account();
        em.persist(account1);
        em.persist(account2);
        em.persist(account3);

        account1_seq = account1.getAccountSeq();
        account2_seq = account2.getAccountSeq();

        Chatroom chatroom1 = Chatroom.builder().build();
        Chatroom chatroom2 = Chatroom.builder().build();
        Chatroom chatroom3 = Chatroom.builder().build();
        em.persist(chatroom1);
        em.persist(chatroom2);
        em.persist(chatroom3);

        AccountChatroom accountChatroom12 = new AccountChatroom(new AccountChatroomEmbedded(account1, chatroom1), "12", null);
        AccountChatroom accountChatroom21 = new AccountChatroom(new AccountChatroomEmbedded(account2, chatroom1), "21", null);
        AccountChatroom accountChatroom23 = new AccountChatroom(new AccountChatroomEmbedded(account2, chatroom2), "23", null);
        AccountChatroom accountChatroom32 = new AccountChatroom(new AccountChatroomEmbedded(account3, chatroom2), "32", null);
        AccountChatroom accountChatroom13 = new AccountChatroom(new AccountChatroomEmbedded(account1, chatroom3), "13", null);
        AccountChatroom accountChatroom31 = new AccountChatroom(new AccountChatroomEmbedded(account3, chatroom3), "31", null);
        accountChatroomRepository.save(accountChatroom12);
        accountChatroomRepository.save(accountChatroom21);
        accountChatroomRepository.save(accountChatroom23);
        accountChatroomRepository.save(accountChatroom32);
        accountChatroomRepository.save(accountChatroom13);
        accountChatroomRepository.save(accountChatroom31);

        Chat chat1 = new Chat(null, account1, chatroom1, "first", ChatTypeEnum.TALK);
        Chat chat2 = new Chat(null, account2, chatroom1, "something", ChatTypeEnum.TALK);
        Chat chat3 = new Chat(null, account1, chatroom1, "last", ChatTypeEnum.TALK);
        em.persist(chat1);
        em.persist(chat2);
        em.persist(chat3);

        em.flush();
        em.clear();
    }

    @Test
    public void findMyChatroomListTest() throws Exception {
        //given

        // when
        System.out.println("=========================================================================================");
        List<AccountChatroomDTO> accountChatroomDTOPage = accountChatroomRepository.findAccountChatroomList(account1_seq);

        // then
        assertThat(accountChatroomDTOPage.size()).isEqualTo(2);
        assertThat(accountChatroomDTOPage.get(0).getLastMessage()).isEqualTo(null);
        assertThat(accountChatroomDTOPage.get(0).getUnreadChatCnt()).isEqualTo(0);
        assertThat(accountChatroomDTOPage.get(1).getLastMessage()).isEqualTo("last");
        assertThat(accountChatroomDTOPage.get(1).getUnreadChatCnt()).isEqualTo(3);

    }


    @Test
    public void findChatroomSeqWithTest() throws Exception {
        //given

        //when
        System.out.println("=======================================================================");
        List<Long> chatroomSeqWith1 = accountChatroomRepository.findChatroomSeqWith(account1_seq, account2_seq);
        List<Long> chatroomSeqWith2 = accountChatroomRepository.findChatroomSeqWith(account1_seq, 0L);

        //then
        assertThat(chatroomSeqWith1.size()).isEqualTo(1);
        assertThat(chatroomSeqWith2.size()).isEqualTo(0);
    }
}