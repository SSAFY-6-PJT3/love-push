package com.cupid.joalarm.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateChatroomDto {
    private long sendAccountSeq;
    private long receiveAccountSeq;
}
