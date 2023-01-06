package com.cupid.joalarm.chat.repository;

import static com.cupid.joalarm.chat.entity.QChat.chat;

import com.cupid.joalarm.chat.dto.ChatDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class ChatRepositoryImpl implements ChatRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<ChatDto> getChatList(Long roomSeq, Long chatSeq) {
        return jpaQueryFactory
                .select(Projections.constructor(ChatDto.class,
                        chat.chatroom.seq,
                        chat.account.accountSeq,
                        chat.message,
                        chat.createdAt)
                )
                .from(chat)
                .where(chat.chatroom.seq.eq(roomSeq), chat.seq.lt(chatSeq))
                .limit(20)
                .orderBy(chat.seq.desc())
                .fetch();
    }
}
