package com.cupid.joalarm.chat.DTO;

import java.sql.Timestamp;

public class ChatMessageDTO {
    public enum MessageType {
        TALK, QUIT
    }

    private MessageType type;
    private long roomId;
    private long sender;
    private String message;

    public MessageType getType() {
        return type;
    }

    public void setType(MessageType type) {
        this.type = type;
    }

    public long getRoomId() {
        return roomId;
    }

    public void setRoomId(long roomId) {
        this.roomId = roomId;
    }

    public long getSender() {
        return sender;
    }

    public void setSender(long sender) {
        this.sender = sender;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}