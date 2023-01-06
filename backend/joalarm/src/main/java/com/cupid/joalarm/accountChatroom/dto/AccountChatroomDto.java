package com.cupid.joalarm.accountChatroom.dto;

import com.cupid.joalarm.chat.dto.ChatDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountChatroomDto {
    private Long ChatroomSeq;
    private String name;
    private ChatDto lastMessage;
    private Long unreadChatCnt;
}
