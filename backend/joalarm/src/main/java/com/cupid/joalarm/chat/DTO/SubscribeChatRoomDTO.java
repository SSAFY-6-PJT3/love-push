package com.cupid.joalarm.chat.dto;

public class SubscribeChatRoomDTO {
    private String type;
    private long person;
    private long chatRoom;

    public SubscribeChatRoomDTO(String type, long person, long chatRoom) {
        this.type = type;
        this.person = person;
        this.chatRoom = chatRoom;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getPerson() {
        return person;
    }

    public void setPerson(long person) {
        this.person = person;
    }

    public long getChatRoom() {
        return chatRoom;
    }

    public void setChatRoom(long chatRoom) {
        this.chatRoom = chatRoom;
    }
}
