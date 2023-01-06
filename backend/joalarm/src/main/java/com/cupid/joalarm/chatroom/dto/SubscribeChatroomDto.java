package com.cupid.joalarm.chatroom.dto;

import lombok.Data;

@Data
public class SubscribeChatroomDto {
    private String type;
    private long person;
    private long chatRoom;

    public SubscribeChatroomDto(String type, long person, long chatRoom) {
        this.type = type;
        this.person = person;
        this.chatRoom = chatRoom;
    }
}
