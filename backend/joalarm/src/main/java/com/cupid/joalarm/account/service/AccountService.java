package com.cupid.joalarm.account.service;

import com.cupid.joalarm.account.dto.AccountDto;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.school.entity.School;
import com.cupid.joalarm.school.repository.SchoolRepository;
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
    private final SchoolRepository schoolRepository;

    @Transactional
    public AccountDto signup(AccountDto accountDto){
        if(accountRepository.findOneById(accountDto.getId()).orElse(null)!=null){
            throw new DuplicateRequestException("이미 가입되어 있는 유저입니다.");
        }
        Account account = Account.builder()
                .id(accountDto.getId())
                .password(passwordEncoder.encode(accountDto.getPassword()))
                .emoji(accountDto.getEmoji())

                .firstName(accountDto.getFirstName())
                .lastName(accountDto.getLastName())
                .school(schoolRepository.findByName(accountDto.getSchool()))
                .reportedCnt(0)
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

    @Transactional
    public Long findSchoolSeqBySeq(Long seq){
        Optional<Account> account = accountRepository.findAccountByAccountSeq(seq);
        if(account.isEmpty()) return null;

        School school = account.get().getSchool();

        Long schoolId = school.getSchoolId();

        return schoolId;
    }

    @Transactional
    public String findSchoolNameBySeq(Long seq){
        Optional<Account> account = accountRepository.findAccountByAccountSeq(seq);
        if(account.isEmpty()) return null;

        School school = account.get().getSchool();

        String schoolName = school.getName();

        return schoolName;
    }

    @Transactional(readOnly = true)
    public Account findAccountBySeq(Long seq){
        return accountRepository.findAccountByAccountSeq(seq)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 account"));
    }
}
