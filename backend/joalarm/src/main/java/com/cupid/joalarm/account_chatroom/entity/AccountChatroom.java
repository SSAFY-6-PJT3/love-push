package com.cupid.joalarm.account_chatroom.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AccountChatroom extends BaseTimeEntity {

    @EmbeddedId
    private AccountChatroomEmbedded accountChatroomEmbedded;

    private String name;

    private Long lastViewChatSeq;  // 유저-채팅방 관계에서는 굳이 마지막 확인 채팅 데이터를 따질 필요가 없다고 판단, pk만 있으면 된다.
}
