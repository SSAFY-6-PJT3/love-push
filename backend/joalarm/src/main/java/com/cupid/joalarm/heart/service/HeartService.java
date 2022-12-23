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
        Optional<Account> accountOpt = accountRepository.findAccountByAccountSeq(heartDto.getAccountSeq());
        Optional<HeartEntity> heartOpt = heartRepository.findById(heartDto.getAccountSeq());
        Optional<School> schoolOpt = schoolRepository.findById(heartDto.getSchoolSeq());

        if (accountOpt.isEmpty() || schoolOpt.isEmpty()) {
            return Optional.empty();
        }

        if (heartOpt.isEmpty()) {
            heartRepository.save(HeartEntity.convert(accountOpt.get(), heartDto, schoolOpt.get()));
        } else {
            HeartEntity heartEntity = heartOpt.get();
            heartEntity.changeLover(heartDto.getFirstName(), heartDto.getLastName(), schoolOpt.get());
        }

        messageTemplate.convertAndSend("/sub/heart", heartDto);
        return Optional.of(heartDto);
    }
}
