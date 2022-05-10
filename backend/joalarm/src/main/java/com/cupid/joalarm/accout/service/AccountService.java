package com.cupid.joalarm.accout.service;

import com.cupid.joalarm.accout.dto.AccountDto;
import com.cupid.joalarm.accout.entity.Account;
import com.cupid.joalarm.accout.repository.AccountRepository;
import com.sun.jdi.request.DuplicateRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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
                .emoji("https://cupid-joalarm.s3.ap-northeast-2.amazonaws.com/Green apple.svg")
                .build();
        return AccountDto.fromEntity(accountRepository.save(account));
    }

    @Transactional
    public AccountDto findAccountById(String id){
        Optional<Account> account = accountRepository.findOneById(id);
        if(account.isEmpty()) return null;
        else return AccountDto.fromEntity(account.get());
    }
    @Transactional
    public boolean existAccountById(String id){
        Optional<Account> account = accountRepository.findOneById(id);
        return account.isPresent();
    }
    @Transactional
    public Long findSeqById(String id){
        Optional<Account> account = accountRepository.findOneById(id);
        if(account.isEmpty()) return null;
        else return account.get().getAccountSeq();
    }
    @Transactional
    public String updateEmojiById(Long seq, String emoji){
        Optional<Account> account = accountRepository.findAccountByAccountSeq(seq);
        if(account.isEmpty()) return null;
        account.get().setEmoji(emoji);
        return account.get().getEmoji();
    }
    @Transactional
    public AccountDto findBySeq(Long seq){
        Optional<Account> account = accountRepository.findAccountByAccountSeq(seq);
        if(account.isEmpty()) return null;
        else return AccountDto.fromEntity(account.get());
    }
    @Transactional
    public boolean reportBYSeq(Long seq){
        Optional<Account> account = accountRepository.findAccountByAccountSeq(seq);
        if(account.isEmpty()) return false;
        account.get().setReportedCnt(account.get().getReportedCnt()+1);
        return true;
    }
}
