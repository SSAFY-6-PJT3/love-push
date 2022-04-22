package com.cupid.joalarm.accout.service;

import com.cupid.joalarm.accout.dto.AccountDto;
import com.cupid.joalarm.accout.entity.Account;
import com.cupid.joalarm.accout.repository.AccountRepository;
import com.sun.jdi.request.DuplicateRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional
    public AccountDto signup(AccountDto accountDto){
        if(accountRepository.findOneById(accountDto.getId()).orElse(null)!=null){
            throw new DuplicateRequestException("이미 가입되어 있는 유저입니다.");
        }

        Account account = Account.builder()
                .id(accountDto.getId())
                .password(passwordEncoder.encode(accountDto.getPassword()))
                .emoji(accountDto.getEmoji())
                .build();
        return AccountDto.from(accountRepository.save(account));
    }


}
