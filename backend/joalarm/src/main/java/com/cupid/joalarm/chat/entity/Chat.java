package com.cupid.joalarm.chat.entity;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.chatroom.entity.Chatroom;
import lombok.*;
//import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
//@Document(collection = "chat")

public class Chat extends BaseTimeEntity {

    @Id @GeneratedValue
    @Column(name = "chat_seq")
    private Long seq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_seq")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_seq")
    private Chatroom chatroom;

    private String message;

    @Enumerated(EnumType.STRING)
    private ChatTypeEnum chatType;
}
