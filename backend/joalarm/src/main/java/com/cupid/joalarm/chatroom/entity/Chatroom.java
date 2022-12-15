package com.cupid.joalarm.chatroom.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.chat.entity.Chat;
import lombok.*;
//import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
//@Document(collection = "chatroom")
public class Chatroom extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "chatroom_seq")
    private Long seq;

//    private String name;
    @Builder.Default
    private boolean isActivate = true;

    public void setActivate(boolean activate) {
        isActivate = activate;
    }
}
