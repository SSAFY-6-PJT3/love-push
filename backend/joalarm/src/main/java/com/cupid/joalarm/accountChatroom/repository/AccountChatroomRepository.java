package com.cupid.joalarm.accountChatroom.repository;

import com.cupid.joalarm.accountChatroom.entity.AccountChatroom;
import com.cupid.joalarm.accountChatroom.entity.AccountChatroomEmbedded;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AccountChatroomRepository extends JpaRepository<AccountChatroom, AccountChatroomEmbedded>,
        AccountChatroomRepositoryCustom {

    @Query("select ac.accountChatroomEmbedded.chatroom.seq " +
            "from AccountChatroom ac " +
            "inner join AccountChatroom ac2 " +
            "on ac2.accountChatroomEmbedded.account.accountSeq = :otherPersonSeq " +
            "and ac.accountChatroomEmbedded.chatroom.seq = ac2.accountChatroomEmbedded.chatroom.seq " +
            "where ac.accountChatroomEmbedded.account.accountSeq = :mySeq")
    List<Long> findChatroomSeqWith(@Param("mySeq") Long mySeq, @Param("otherPersonSeq") Long otherPersonSeq);

    @Query("select ac.accountChatroomEmbedded.account.accountSeq " +
            "from AccountChatroom ac " +
            "where ac.accountChatroomEmbedded.chatroom.seq = :chatroomSeq")
    List<Long> findAccountsInChatroom(@Param("chatroomSeq") Long chatroomSeq);
}
