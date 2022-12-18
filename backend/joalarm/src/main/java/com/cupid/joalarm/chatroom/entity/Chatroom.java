package com.cupid.joalarm.chatroom.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
@Document(collection = "chatroom")

public class Chatroom extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "chatroom_id")
    private Long id;

//    private String name;

    private boolean isActivate = true;

    private String lastMessage;
}
