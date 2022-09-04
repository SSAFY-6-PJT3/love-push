package com.cupid.joalarm.account.repository;

import com.cupid.joalarm.account.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AccountRepository extends JpaRepository<Account, Long> {
    Optional<Account> findOneById(String id);
    Optional<Account> findAccountByAccountSeq(Long seq);
}