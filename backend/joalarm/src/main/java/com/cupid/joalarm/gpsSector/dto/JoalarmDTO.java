package com.cupid.joalarm.gpsSector.dto;

import com.cupid.joalarm.gpsSector.dto.PkEmojiPairDTO;

public class JoalarmDTO {
    private String gpsKey;
    private PkEmojiPairDTO pair;

    public String getGpsKey() {
        return gpsKey;
    }

    public void setGpsKey(String gpsKey) {
        this.gpsKey = gpsKey;
    }

    public PkEmojiPairDTO getPair() {
        return pair;
    }

    public void setPair(PkEmojiPairDTO pkEmojiPairDTO) {
        this.pair = pkEmojiPairDTO;
    }
}
