package com.cupid.joalarm.chat.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {

    private long roomId;
    private long sender;
    private String message;
    private LocalDateTime sendTime;
}