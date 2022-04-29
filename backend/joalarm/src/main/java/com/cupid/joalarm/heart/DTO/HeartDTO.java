package com.cupid.joalarm.heart.dto;

public class HeartDTO {
    private int[] receiveUsers;
    private int sendUser;

    public int[] getReceiveUsers() {
        return receiveUsers;
    }

    public void setReceiveUsers(int[] receiveUsers) {
        this.receiveUsers = receiveUsers;
    }

    public int getSendUser() {
        return sendUser;
    }

    public void setSendUser(int sendUser) {
        this.sendUser = sendUser;
    }
}
