package com.cupid.joalarm.heart.repository;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.heart.entity.AccountsEmbedded;
import com.cupid.joalarm.heart.entity.Heart;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.StringJoiner;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class HeartRepositoryTest {
    @Autowired AccountRepository accountRepository;
    @Autowired HeartRepository heartRepository;
    @Autowired EntityManager em;

    @Test
    public void findReceiveMyHeartAccountsTest() throws Exception {

//        given
        Account account1 = new Account();
        Account account2 = new Account();
        Account account3 = new Account();
        accountRepository.save(account1);
        accountRepository.save(account2);
        accountRepository.save(account3);

        Heart heart1 = Heart.builder()
                .AccountsWhoExchangedHearts(
                        new AccountsEmbedded(
                                account1, account2
                        )
                ).build();

        Heart heart2 = Heart.builder()
                .AccountsWhoExchangedHearts(
                        new AccountsEmbedded(
                                account1, account3
                        )
                ).build();

        Heart heart3 = Heart.builder()
                .AccountsWhoExchangedHearts(
                        new AccountsEmbedded(
                                account2, account3
                        )
                ).build();

        heartRepository.save(heart1);
        heartRepository.save(heart2);
        heartRepository.save(heart3);

//        when
        em.flush();
        em.clear();

        System.out.println("=============================================================");
        List<Long> receiveMyHeartAccountsSeq = heartRepository.findReceiveMyHeartAccountsSeq(account1.getAccountSeq());

        //then
        StringJoiner sb = new StringJoiner(", ");

        for (Long receiveMyHeartAccountSeq : receiveMyHeartAccountsSeq) {
            sb.add(Long.toString(receiveMyHeartAccountSeq));
        }
        System.out.println("receiveMyHeartAccountsSeq = " + sb);

        assertThat(receiveMyHeartAccountsSeq).containsExactly(account2.getAccountSeq(), account3.getAccountSeq());
    }
}