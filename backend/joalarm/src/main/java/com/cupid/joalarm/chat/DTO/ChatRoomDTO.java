package com.cupid.joalarm.chat.dto;

import java.awt.*;

public class ChatRoomDTO {
    private Long pk;
    private Point users;

    public ChatRoomDTO(Long pk, Point users) {
        this.pk = pk;
        this.users = users;
    }

    public Long getPk() {
        return pk;
    }

    public void setPk(Long pk) {
        this.pk = pk;
    }

    public Point getUsers() {
        return users;
    }

    public void setUsers(Point users) {
        this.users = users;
    }

}
