package com.cupid.joalarm.account_chatroom.repository;

import com.cupid.joalarm.account_chatroom.entity.AccountChatroom;
import com.cupid.joalarm.account_chatroom.entity.AccountChatroomEmbedded;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccountChatroomRepository extends JpaRepository<AccountChatroom, AccountChatroomEmbedded>, AccountChatroomRepositoryCustom {

    @Query("select ac.accountChatroomEmbedded.chatroom.seq " +
            "from AccountChatroom ac " +
                "inner join AccountChatroom ac2 " +
                "on ac2.accountChatroomEmbedded.account.accountSeq = :otherPersonSeq " +
            "where ac.accountChatroomEmbedded.account.accountSeq = :mySeq")
    List<Long> findChatroomSeqWith(@Param("mySeq") Long mySeq, @Param("otherPersonSeq") Long otherPersonSeq);
}
