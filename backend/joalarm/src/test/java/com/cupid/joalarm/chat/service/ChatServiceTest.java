package com.cupid.joalarm.chat.service;

import static org.assertj.core.api.Assertions.assertThat;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.chat.dto.ChatDTO;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.repository.ChatRepository;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import com.cupid.joalarm.chatroom.repository.ChatRoomRepository;
import java.util.List;
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
    @Autowired ChatRepository chatRepository;

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
            setMessage("messageTest");
        }};

        //when
        Chat chat = chatService.CreateChat(chatDTO);

        //then
        System.out.println(chat.getSeq());
        System.out.println(chat.getCreatedDate());
        System.out.println(chat.getModifiedDate());

        assertThat(chatDTO.getMessage()).isEqualTo(chat.getMessage());
        assertThat(chatDTO.getSender()).isEqualTo(chat.getAccount().getAccountSeq());
        assertThat(chatDTO.getRoomId()).isEqualTo(chat.getChatroom().getSeq());
    }

    @Test
    public void getChatTest() throws Exception {
        //given
        Chatroom chatroom = Chatroom.builder().build();
        chatRoomRepository.save(chatroom);

        long chatSeq = -1;

        for (int i = 0; i < 30; i++) {
            Chat chat = Chat.builder()
                    .message("chat" + i)
                    .chatroom(chatroom)
                    .build();

            chatRepository.save(chat);

            chatSeq = chat.getSeq();
        }

        //when
        List<ChatDTO> chatList = chatService.getChatList(chatroom.getSeq(), chatSeq);

        //then
        for (ChatDTO chatDTO : chatList) {
            System.out.println("chatDTO.getMessage() = " + chatDTO.getMessage());
        }
    }
}