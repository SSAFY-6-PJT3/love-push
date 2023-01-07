package com.cupid.joalarm.feed.repository;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    List<Feed> findByAccount(Account account);
}