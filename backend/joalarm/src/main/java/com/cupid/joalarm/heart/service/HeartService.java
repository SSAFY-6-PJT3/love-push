package com.cupid.joalarm.heart.service;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.heart.dto.HeartDto;
import com.cupid.joalarm.heart.entity.AccountsEmbedded;
import com.cupid.joalarm.heart.entity.Heart;
import com.cupid.joalarm.heart.repository.HeartRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class HeartService {

    private final HeartRepository heartRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public boolean receiveHeart(HeartDto heartDto) {
        Optional<Account> sendAccount = accountRepository.findAccountByAccountSeq(heartDto.getSendAccountSeq());
        Optional<Account> receiveAccount = accountRepository.findAccountByAccountSeq(heartDto.getReceiveAccountSeq());

        if (sendAccount.isEmpty() || receiveAccount.isEmpty()) {
            return false;
        }

        heartRepository.save(new Heart(new AccountsEmbedded(sendAccount.get(), receiveAccount.get())));

        return heartRepository.findHeart(heartDto.getReceiveAccountSeq(), heartDto.getSendAccountSeq()).size() > 0;
    }
}