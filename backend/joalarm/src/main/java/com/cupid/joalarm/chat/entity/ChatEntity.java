package com.cupid.joalarm.chat.entity;

import com.cupid.joalarm.chat.DTO.ChatMessageDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "chat")

public class ChatEntity {
    private ChatMessageDTO.MessageType type;
    private long roomId;
    private long sender;
    private String message;
    private String sendTime;
}
