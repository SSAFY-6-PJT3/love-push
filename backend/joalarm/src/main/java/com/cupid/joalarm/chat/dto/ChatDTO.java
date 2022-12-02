package com.cupid.joalarm.chat.dto;

import lombok.Data;

@Data
public class ChatDTO {

    private long roomId;
    private long sender;
    private String message;
    private String sendTime;
}