package com.cupid.joalarm.chatroom.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Document(collection = "chatroom")

public class ChatroomEntity {

    @Id @GeneratedValue
    @Column(name = "chatroom_id")
    private Long id;

    private String name;

    private boolean isActivate = true;
}
