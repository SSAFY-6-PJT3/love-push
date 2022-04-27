package com.cupid.joalarm.gpsSector.dto;

public class JoalarmDTO {
    private String gpsKey;
    private PkEmojiPairDTO pkEmojiPairDTO;

    public String getGpsKey() {
        return gpsKey;
    }

    public void setGpsKey(String gpsKey) {
        this.gpsKey = gpsKey;
    }

    public PkEmojiPairDTO getPair() {
        return pkEmojiPairDTO;
    }

    public void setPair(PkEmojiPairDTO pkEmojiPairDTO) {
        this.pkEmojiPairDTO = pkEmojiPairDTO;
    }
}
