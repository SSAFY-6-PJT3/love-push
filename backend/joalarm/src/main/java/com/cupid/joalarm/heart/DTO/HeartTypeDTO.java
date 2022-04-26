package com.cupid.joalarm.heart.dto;

public class HeartTypeDTO {
    private String type;
    private int person;

    public HeartTypeDTO(String type, int person) {
        this.type = type;
        this.person = person;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getPerson() {
        return person;
    }

    public void setPerson(int person) {
        this.person = person;
    }
}
