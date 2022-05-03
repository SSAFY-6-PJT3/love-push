package com.cupid.joalarm.chatroom.dto;

public class CreateChatRoomDTO {
    private long sendUser;
    private long receiveUser;

    public long getSendUser() {
        return sendUser;
    }

    public void setSendUser(int sendUser) {
        this.sendUser = sendUser;
    }

    public long getReceiveUser() {
        return receiveUser;
    }

    public void setReceiveUser(int receiveUser) {
        this.receiveUser = receiveUser;
    }

}
