package com.cupid.joalarm.chatroom.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder

public class ChatRoomEntity {

    @Id @GeneratedValue
    @Column(name = "chatroom_seq")
    private Long seq;
    
    @Builder.Default
    private boolean isActivate = true;

    public void setActivate(boolean activate) {
        isActivate = activate;
    }
}
