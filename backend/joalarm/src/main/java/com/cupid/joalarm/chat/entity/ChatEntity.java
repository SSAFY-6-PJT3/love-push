package com.cupid.joalarm.chat.entity;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.chatroom.entity.ChatroomEntity;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Document(collection = "chat")

public class ChatEntity {

    @Id @GeneratedValue
    @Column(name = "chat_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroom_id")
    private ChatroomEntity chatroom;

    private LocalDateTime sendTime;

    @Enumerated(EnumType.STRING)
    private ChatTypeEnum chatType;
}
