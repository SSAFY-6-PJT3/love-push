package com.cupid.joalarm.gpsSector.dto;

import com.cupid.joalarm.gpsSector.dto.PkEmojiPairDTO;

public class SectorDTO {
    private String beforeGpsKey;
    private String nowGpsKey;
    private PkEmojiPairDTO pair;

    public String getBeforeGpsKey() {
        return beforeGpsKey;
    }

    public void setBeforeGpsKey(String beforeGpsKey) {
        this.beforeGpsKey = beforeGpsKey;
    }

    public String getNowGpsKey() {
        return nowGpsKey;
    }

    public void setNowGpsKey(String nowGpsKey) {
        this.nowGpsKey = nowGpsKey;
    }

    public PkEmojiPairDTO getPair() {
        return pair;
    }

    public void setPair(PkEmojiPairDTO pair) {
        this.pair = pair;
    }
}
