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
    private long roomSeq;
    private long sender;
    private String message;
    private LocalDateTime sendTime;

    public ChatDto(long roomSeq, Chat chat) {
        this(
                roomSeq,
                chat.getAccount().getAccountSeq(),
                chat.getMessage(),
                chat.getCreatedAt()
        );
    }
}
