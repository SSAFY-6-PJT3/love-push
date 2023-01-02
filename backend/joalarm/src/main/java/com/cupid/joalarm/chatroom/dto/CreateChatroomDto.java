package com.cupid.joalarm.chatroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateChatRoomDTO {
    private long sendUser;
    private long receiveUser;
}
