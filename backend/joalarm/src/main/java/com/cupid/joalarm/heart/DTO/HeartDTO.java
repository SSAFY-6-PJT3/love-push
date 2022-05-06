package com.cupid.joalarm.heart.dto;

public class HeartDTO {
    private String[] receiveSessions;
    private long[] receiveUsers;
    private long sendUser;

    public String[] getReceiveSessions() {
        return receiveSessions;
    }

    public void setReceiveSessions(String[] receiveSessions) {
        this.receiveSessions = receiveSessions;
    }

    public long[] getReceiveUsers() {
        return receiveUsers;
    }

    public void setReceiveUsers(long[] receiveUsers) {
        this.receiveUsers = receiveUsers;
    }

    public long getSendUser() {
        return sendUser;
    }

    public void setSendUser(long sendUser) {
        this.sendUser = sendUser;
    }
}
