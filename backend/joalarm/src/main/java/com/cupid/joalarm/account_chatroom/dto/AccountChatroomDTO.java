package com.cupid.joalarm.account_chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountChatroomDTO {
    private Long ChatroomSeq;
    private String name;
    private String lastMessage;
    private Long unreadChatCnt;
}
