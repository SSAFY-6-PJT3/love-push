package com.cupid.joalarm.user_chatroom.entity;

import com.cupid.joalarm.embeddable.AccountChatroomEmbedded;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class UserChatroomEntity {

    @EmbeddedId
    private AccountChatroomEmbedded accountChatroomEmbedded;

    private String name;

    private boolean isActivate = true;
}
