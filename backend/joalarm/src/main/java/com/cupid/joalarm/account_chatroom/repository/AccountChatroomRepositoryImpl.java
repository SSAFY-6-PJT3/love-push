package com.cupid.joalarm.account_chatroom.repository;

import com.cupid.joalarm.account_chatroom.dto.AccountChatroomDTO;
import com.cupid.joalarm.account_chatroom.dto.QAccountChatroomDTO;
import com.cupid.joalarm.chat.entity.Chat;
import com.cupid.joalarm.chat.entity.QChat;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;
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
    public List<AccountChatroomDTO> findAccountChatroomList(Long accountSeq) {

        return jpaQueryFactory
                .select(Projections.constructor(AccountChatroomDTO.class,
                        chatroom.seq,
                        accountChatroom.name,
                        chatroom.lastMessage,
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
                        accountChatroom.modifiedDate.lt(chat.createdTime)
                )

                .where(accountChatroom.accountChatroomEmbedded.account.accountSeq.eq(accountSeq))
                .groupBy(chatroom.seq)
                .orderBy(accountChatroom.modifiedDate.desc())
                .fetch();
    }
}
