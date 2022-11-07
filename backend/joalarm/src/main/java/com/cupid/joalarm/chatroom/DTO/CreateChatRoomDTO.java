package com.cupid.joalarm.chatroom.dto;

import lombok.Data;

@Data
public class CreateChatRoomDTO {
    private long sendAccountSeq;
    private long receiveAccountSeq;
}
