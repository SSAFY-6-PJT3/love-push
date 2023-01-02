package com.cupid.joalarm.accountChatroom.entity;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Embeddable
public class AccountChatroomEmbedded implements Serializable {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_seq")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_seq")
    private Chatroom chatroom;
}
