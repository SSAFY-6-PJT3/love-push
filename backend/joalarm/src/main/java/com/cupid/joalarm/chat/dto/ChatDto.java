package com.cupid.joalarm.chat.dto;

import com.cupid.joalarm.chat.entity.Chat;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDto {
    private long chatroomSeq;
    private long sendAccountSeq;
    private String message;
    private LocalDateTime sendTime;

    public ChatDto(long chatroomSeq, Chat chat) {
        this.chatroomSeq = chatroomSeq;
        this.sendAccountSeq = chat.getAccount().getAccountSeq();
        this.message = chat.getMessage();
        this.sendTime = chat.getCreatedAt();
    }
}
