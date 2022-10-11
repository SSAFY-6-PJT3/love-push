package com.cupid.joalarm.heart.dto;

import lombok.Data;

import java.util.HashMap;

@Data
public class SendHeartDTO {
    private HashMap<String, Long> sessionAccountHashMap;
    private long sendUser;
}
