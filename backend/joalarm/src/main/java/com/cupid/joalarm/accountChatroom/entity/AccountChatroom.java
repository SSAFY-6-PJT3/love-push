package com.cupid.joalarm.accountChatroom.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.chatroom.util.RandomNameCreator;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class AccountChatroom extends BaseTimeEntity {

    @EmbeddedId
    private AccountChatroomEmbedded accountChatroomEmbedded;

    @Builder.Default
    @Setter
    private String name = RandomNameCreator.newName((int) (Math.random() * Integer.MAX_VALUE));

    @Builder.Default
    @Setter
    private Long lastViewChatSeq = 0L;
}
