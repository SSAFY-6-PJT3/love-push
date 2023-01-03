package com.cupid.joalarm.chatroom.dto;

import lombok.Data;

@Data
public class ChatRoomDTO {
    private Long pk;
    private Long[] users;

    public ChatRoomDTO(Long pk, Long[] users) {
        this.pk = pk;
        this.users = users;
    }

}
