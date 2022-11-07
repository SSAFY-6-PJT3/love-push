package com.cupid.joalarm.feed;

import com.cupid.joalarm.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    List<Feed> findByAccount(Account account);
}