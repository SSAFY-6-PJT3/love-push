package com.cupid.joalarm.heart.service;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.heart.dto.HeartDto;
import com.cupid.joalarm.heart.entity.HeartEntity;
import com.cupid.joalarm.heart.repository.HeartRepository;
import com.cupid.joalarm.school.School;
import com.cupid.joalarm.school.SchoolRepository;
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
    private final SchoolRepository schoolRepository;
    private final SimpMessageSendingOperations messageTemplate;

    @Transactional
    public Optional<HeartDto> setHeart(HeartDto heartDto) {
        Optional<Account> accountOptional = accountRepository.findAccountByAccountSeq(heartDto.getAccountSeq());
        Optional<School> schoolOptional = schoolRepository.findById(heartDto.getLoverSchoolSeq());

        if (accountOptional.isEmpty() || schoolOptional.isEmpty()) {
            return Optional.empty();
        }

        heartRepository.save(HeartEntity.convert(accountOptional.get(), heartDto, schoolOptional.get()));
        messageTemplate.convertAndSend("/sub/heart", heartDto);
        return Optional.of(heartDto);
    }
}
