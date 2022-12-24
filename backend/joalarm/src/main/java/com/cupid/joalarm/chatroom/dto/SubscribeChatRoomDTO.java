package com.cupid.joalarm.chatroom.dto;

import lombok.Data;

@Data
public class SubscribeChatRoomDTO {
    private String type;
    private long person;
    private long chatRoom;

    public SubscribeChatRoomDTO(String type, long person, long chatRoom) {
        this.type = type;
        this.person = person;
        this.chatRoom = chatRoom;
    }
}
