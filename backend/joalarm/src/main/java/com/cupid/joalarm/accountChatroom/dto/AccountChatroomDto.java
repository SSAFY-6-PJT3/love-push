package com.cupid.joalarm.accountChatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountChatroomDto {
    private Long ChatroomSeq;
    private String name;
    private String lastMessage;
    private Long unreadChatCnt;
}
