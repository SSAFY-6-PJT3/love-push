package com.cupid.joalarm.chat.dto;

import java.awt.*;

public class ChatRoomDTO {
    private Long pk;
    private Long[] users;

    public ChatRoomDTO(Long pk, Long[] users) {
        this.pk = pk;
        this.users = users;
    }

    public Long getPk() {
        return pk;
    }

    public void setPk(Long pk) {
        this.pk = pk;
    }

    public Long[] getUsers() {
        return users;
    }

    public void setUsers(Long[] users) {
        this.users = users;
    }

}
