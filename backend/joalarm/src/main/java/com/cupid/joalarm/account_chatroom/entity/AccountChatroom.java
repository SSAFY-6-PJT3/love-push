package com.cupid.joalarm.account_chatroom.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.chat.entity.Chat;
import lombok.*;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class AccountChatroom extends BaseTimeEntity {

    @EmbeddedId
    private AccountChatroomEmbedded accountChatroomEmbedded;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_view_chat_seq")
    private Chat lastViewChat;
}
