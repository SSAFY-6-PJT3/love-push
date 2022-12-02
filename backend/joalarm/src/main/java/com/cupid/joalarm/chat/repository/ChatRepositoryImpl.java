package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.dto.ChatDTO;
import com.cupid.joalarm.chat.entity.QChat;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.cupid.joalarm.chat.entity.QChat.chat;

@Repository
@RequiredArgsConstructor
public class ChatRepositoryImpl implements ChatRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public List<ChatDTO> getChatList(Long roomSeq, Long chatSeq) {
        return jpaQueryFactory
                .select(Projections.constructor(ChatDTO.class))
                .from(chat)
                .where(chat.chatroom.seq.eq(roomSeq), chat.seq.lt(chatSeq))
                .limit(20)
                .orderBy(chat.seq.desc())
                .fetch();
    }
}
