package com.cupid.joalarm.accountChatroom.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chatroom.util.RandomNameCreator;
import java.time.LocalDateTime;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class AccountChatroom extends BaseTimeEntity {
    @EmbeddedId
    private AccountChatroomEmbedded accountChatroomEmbedded;

    @Builder.Default
    private String name = RandomNameCreator.newName(LocalDateTime.now().getNano());

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "last_view_chat_seq")
    private Chat lastViewChat;
}
