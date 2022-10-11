package com.cupid.joalarm.heart.service;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.heart.dto.HeartTypeDTO;
import com.cupid.joalarm.heart.entity.AccountsEmbedded;
import com.cupid.joalarm.heart.entity.Heart;
import com.cupid.joalarm.heart.repository.HeartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final AccountRepository accountRepository;
    private final SimpMessageSendingOperations messageTemplate;

    @Transactional
    public void sendHeart(long sendAccountSeq, HashMap<String, Long> sessionAccountHashMap) {
        Optional<Account> sendAccount = accountRepository.findAccountByAccountSeq(sendAccountSeq);
        sendAccount.ifPresent(Account::touchHeartCntPlus);

        for (Map.Entry<String, Long> receiveAccountEntry : sessionAccountHashMap.entrySet()) {
            Optional<Account> receiveAccount = accountRepository.findAccountByAccountSeq(receiveAccountEntry.getValue());
            receiveAccount.ifPresent(Account::receiveHeartCntPlus);

            if (sendAccount.isPresent() && receiveAccount.isPresent()) {
                Heart heart = Heart.builder()
                        .AccountsWhoExchangedHearts(
                                new AccountsEmbedded(
                                        sendAccount.get(), receiveAccount.get()
                                )
                        ).build();

                heartRepository.save(heart);
            }

            receiveHeart(sendAccountSeq, receiveAccountEntry.getKey());
        }
    }

    public void receiveHeart(long sendAccountSeq, String session) {
        messageTemplate.convertAndSend("/sub/heart/" + session, new HeartTypeDTO("HEART", sendAccountSeq));
    }

    public List<Long> SendHeartList(long seq) {
        return heartRepository.findReceiveMyHeartAccountsSeq(seq);
    }
}
