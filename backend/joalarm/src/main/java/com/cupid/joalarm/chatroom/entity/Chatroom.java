package com.cupid.joalarm.chatroom.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import lombok.*;

import javax.persistence.Id;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder

public class Chatroom extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "chatroom_seq")
    private Long seq;

    @Builder.Default
    private boolean isActivate = true;

    public void setActivate(boolean activate) {
        isActivate = activate;
    }
}
