package com.cupid.joalarm.gpsSector.DTO;

public class SectorDTO {
    private String beforeGpsKey;
    private String nowGpsKey;
    private int pk;

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

    public int getPk() {
        return pk;
    }

    public void setPk(int pk) {
        this.pk = pk;
    }
}
