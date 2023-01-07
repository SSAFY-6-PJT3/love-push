package com.cupid.joalarm.love.service;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.love.dto.LoveDto;
import com.cupid.joalarm.love.entity.Love;
import com.cupid.joalarm.love.repository.LoveRepository;
import com.cupid.joalarm.school.entity.School;
import com.cupid.joalarm.school.repository.SchoolRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class LoveService {

    private final LoveRepository loveRepository;
    private final AccountRepository accountRepository;
    private final SchoolRepository schoolRepository;

    @Transactional
    public Optional<LoveDto> setLove(LoveDto loveDto) {
        Optional<Account> accountOpt = accountRepository.findAccountByAccountSeq(loveDto.getAccountSeq());
        Optional<School> schoolOpt = schoolRepository.findById(loveDto.getSchoolSeq());

        if (accountOpt.isEmpty() || schoolOpt.isEmpty()) {
            return Optional.empty();
        }

        loveRepository.findById(loveDto.getAccountSeq())
                .orElseGet(() -> loveRepository.save(Love.convert(accountOpt.get(), loveDto, schoolOpt.get())))
                .changeLover(loveDto.getFirstName(), loveDto.getLastName(), schoolOpt.get());

        return Optional.of(loveDto);
    }

    @Transactional
    public Optional<Love> getLove(Long accountSeq) {
        return loveRepository.findById(accountSeq);
    }
}
