package com.cupid.joalarm.chat.entity;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder

public class Chat extends BaseTimeEntity {

    @Id
    @GeneratedValue
    @Column(name = "chat_seq")
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_seq")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_seq")
    private Chatroom chatroom;

    private String message;
}
