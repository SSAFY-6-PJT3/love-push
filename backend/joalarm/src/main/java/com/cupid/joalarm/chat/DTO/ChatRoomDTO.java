package com.cupid.joalarm.chat.DTO;

import java.util.UUID;

public class ChatRoomDTO {
    private String roomId;
    private String name;

    public String getRoomId() {
        return roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public static ChatRoomDTO create(String name) {
        ChatRoomDTO chatRoomDTO = new ChatRoomDTO();
        chatRoomDTO.setRoomId(UUID.randomUUID().toString());
        chatRoomDTO.setName(name);
        return chatRoomDTO;
    }

}
