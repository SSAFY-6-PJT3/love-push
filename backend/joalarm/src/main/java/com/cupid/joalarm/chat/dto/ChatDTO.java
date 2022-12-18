package com.cupid.joalarm.chat.dto;

import com.cupid.joalarm.chat.entity.ChatTypeEnum;
import lombok.Data;

@Data
public class ChatDTO {

    private ChatTypeEnum type;
    private long roomId;
    private long sender;
    private String message;
    private String sendTime;
}