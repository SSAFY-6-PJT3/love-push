package com.cupid.joalarm.gpsSector.dto;

public class PkEmojiPairDTO {
    private int pk;
    private String emojiURL;

    public PkEmojiPairDTO(int pk, String emojiURL) {
        this.pk = pk;
        this.emojiURL = emojiURL;
    }

    public int getPk() {
        return pk;
    }

    public void setPk(int pk) {
        this.pk = pk;
    }

    public String getEmojiURL() {
        return emojiURL;
    }

    public void setEmojiURL(String emojiURL) {
        this.emojiURL = emojiURL;
    }
}
