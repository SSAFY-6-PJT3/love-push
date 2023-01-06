package com.cupid.joalarm.accountChatroom.dto;

import com.cupid.joalarm.accountChatroom.entity.AccountChatroom;
import com.cupid.joalarm.chat.dto.ChatDto;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountChatroomDto {
    private Long ChatroomSeq;
    private String name;
    private String lastMessage;
    private Long unreadChatCnt;

    public static AccountChatroomDto fromEntity(long chatroomSeq, AccountChatroom accountChatroom) {
        return new AccountChatroomDto(
                chatroomSeq,
                accountChatroom.getName(),
                "null",
                0L
        );
    }
}
