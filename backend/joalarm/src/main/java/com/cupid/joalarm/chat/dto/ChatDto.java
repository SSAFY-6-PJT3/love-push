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

    public static ChatDto fromEntity(long chatroomSeq, Chat chat) {
        return new ChatDto(
                chatroomSeq,
                chat.getAccount().getAccountSeq(),
                chat.getMessage(),
                chat.getCreatedAt()
        );
    }
}
