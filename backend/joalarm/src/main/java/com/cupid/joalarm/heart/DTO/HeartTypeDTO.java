package com.cupid.joalarm.heart.dto;

public class HeartTypeDTO {
    private String type;
    private long person;

    public HeartTypeDTO(String type, long person) {
        this.type = type;
        this.person = person;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public long getPerson() {
        return person;
    }

    public void setPerson(long person) {
        this.person = person;
    }
}
