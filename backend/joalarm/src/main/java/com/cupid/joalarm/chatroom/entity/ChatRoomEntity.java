package com.cupid.joalarm.chatroom.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Document(collection = "chatroom")

public class ChatRoomEntity {

    @Transient
    public static final String SEQUENCE_NAME = "chatroom_sequence";

    @Id
    private long chatroomSeq;
    private long[] userList;
    @Builder.Default
    private boolean isActivate = true;

}
