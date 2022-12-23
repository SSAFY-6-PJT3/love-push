package com.cupid.joalarm.notice.service;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.notice.dto.NoticeDto;
import com.cupid.joalarm.notice.entity.Notice;
import com.cupid.joalarm.notice.repository.NoticeRepository;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository noticeRepository;
    private final AccountRepository accountRepository;

    public List<String> get20NoticeTexts(Long accountSeq) {
        return noticeRepository.findTop20ByAccount_AccountSeqOrderBySeqDesc(accountSeq)
                .stream()
                .map(Notice::getText)
                .collect(Collectors.toList());
    }

    public boolean save(NoticeDto noticeDto) {
        Optional<Account> accountOpt = accountRepository.findAccountByAccountSeq(noticeDto.getAccountSeq());

        if (accountOpt.isEmpty()) {
            return false;
        }

        noticeRepository.save(
                Notice.builder()
                        .account(accountOpt.get())
                        .text(noticeDto.getText())
                        .build());

        return true;
    }
}
