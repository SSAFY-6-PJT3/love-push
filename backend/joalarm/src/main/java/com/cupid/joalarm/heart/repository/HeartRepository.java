package com.cupid.joalarm.heart.repository;

import com.cupid.joalarm.embeddable.AccountsEmbedded;
import com.cupid.joalarm.heart.entity.HeartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HeartRepository extends JpaRepository<HeartEntity, AccountsEmbedded> {

    @Query("select h from HeartEntity h join fetch h.sendReceiveAccount.sendAccountId sid on sid.id = :id")  // Querydsl 사용하여 변경할 것
    public List<Integer> findBySendReceiveAccountSendAccountId(@Param("id") Long id);
}
