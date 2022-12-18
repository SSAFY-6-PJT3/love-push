package com.cupid.joalarm.chat.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.chat.dto.ChatDTO;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.entity.ChatTypeEnum;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest
@Transactional
class ChatServiceTest {

    @Autowired ChatService chatService;
    @Autowired AccountRepository accountRepository;
    @Autowired ChatRoomRepository chatRoomRepository;

    @Test
    public void createChatTest() throws Exception {
        //given
        Account account = new Account();
        accountRepository.save(account);

        Chatroom chatroom = Chatroom.builder().build();
        chatRoomRepository.save(chatroom);

        ChatDTO chatDTO = new ChatDTO() {{
            setSender(account.getAccountSeq());
            setRoomId(chatroom.getSeq());
            setType(ChatTypeEnum.TALK);
            setMessage("messageTest");
        }};

        //when
        Chat chat = chatService.CreateChat(chatDTO);

        //then
        System.out.println(chat.getSeq());
        System.out.println(chat.getCreatedDate());
        System.out.println(chat.getModifiedDate());

        assertThat(chatDTO.getMessage()).isEqualTo(chat.getMessage());
        assertThat(chatDTO.getType()).isEqualTo(chat.getChatType());
        assertThat(chatDTO.getSender()).isEqualTo(chat.getAccount().getAccountSeq());
        assertThat(chatDTO.getRoomId()).isEqualTo(chat.getChatroom().getSeq());
    }
}