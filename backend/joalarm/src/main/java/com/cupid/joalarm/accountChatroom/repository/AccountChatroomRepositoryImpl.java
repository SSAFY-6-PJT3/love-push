package com.cupid.joalarm.accountChatroom.repository;

import static com.cupid.joalarm.accountChatroom.entity.QAccountChatroom.accountChatroom;
import static com.cupid.joalarm.chat.entity.QChat.chat;
import static com.cupid.joalarm.chatroom.entity.QChatroom.chatroom;

import com.cupid.joalarm.accountChatroom.dto.AccountChatroomDto;
import com.cupid.joalarm.chat.dto.ChatDto;
import com.cupid.joalarm.chat.entity.QChat;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class AccountChatroomRepositoryImpl implements AccountChatroomRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<AccountChatroomDto> findMyChatroomList(Long accountSeq) {
        QChat lastMessage = new QChat("lastMessage");

        return jpaQueryFactory
                .select(Projections.constructor(AccountChatroomDto.class,
                        chatroom.seq,
                        accountChatroom.name,
                        lastMessage.message,
                        chat.count())
                )
                .from(accountChatroom)

                .join(chatroom)
                .on(
                        accountChatroom.accountChatroomEmbedded.chatroom.eq(chatroom),
                        chatroom.isActivate.isTrue()
                )

                .leftJoin(chat)
                .on(
                        accountChatroom.accountChatroomEmbedded.chatroom.eq(chat.chatroom),
                        accountChatroom.lastViewChatSeq.lt(chat.seq)
                )

                .leftJoin(lastMessage)
                .on(lastMessage.seq.eq(JPAExpressions
                        .select(lastMessage.seq.max())
                        .from(lastMessage)
                        .where(lastMessage.chatroom.eq(chatroom)))
                )

                .where(accountChatroom.accountChatroomEmbedded.account.accountSeq.eq(accountSeq))
                .groupBy(chatroom, lastMessage)
                .orderBy(lastMessage.createdAt.desc())
                .fetch();
    }
}
