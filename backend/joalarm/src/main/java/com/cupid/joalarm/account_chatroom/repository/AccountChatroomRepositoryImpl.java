package com.cupid.joalarm.account_chatroom.repository;

import com.cupid.joalarm.account_chatroom.dto.AccountChatroomDTO;
import com.cupid.joalarm.chat.entity.QChat;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.cupid.joalarm.account_chatroom.entity.QAccountChatroom.accountChatroom;
import static com.cupid.joalarm.chat.entity.QChat.chat;
import static com.cupid.joalarm.chatroom.entity.QChatroom.chatroom;

@Repository
@RequiredArgsConstructor
public class AccountChatroomRepositoryImpl implements AccountChatroomRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<AccountChatroomDTO> findMyChatroomList(Long accountSeq) {
        QChat lastMessage = new QChat("lastMessage");

        return jpaQueryFactory
                .select(Projections.constructor(AccountChatroomDTO.class,
                        chatroom.seq,
                        accountChatroom.name,
                        lastMessage.message,
                        chat.count())
                )
                .from(accountChatroom)

                .join(chatroom)
                .on(
                        accountChatroom.accountChatroomEmbedded.chatroom.seq.eq(chatroom.seq),
                        chatroom.isActivate.isTrue()
                )

                .leftJoin(chat)
                .on(
                        accountChatroom.accountChatroomEmbedded.chatroom.seq.eq(chat.chatroom.seq),
                        accountChatroom.modifiedDate.lt(chat.createdDate)
                )

                .leftJoin(lastMessage)
                .on(lastMessage.seq.eq(JPAExpressions
                            .select(lastMessage.seq.max())
                            .from(lastMessage)
                            .where(lastMessage.chatroom.seq.eq(chatroom.seq)))
                )

                .where(accountChatroom.accountChatroomEmbedded.account.accountSeq.eq(accountSeq))
                .groupBy(chatroom, lastMessage)
                .orderBy(accountChatroom.modifiedDate.desc())
                .fetch();
    }
}
