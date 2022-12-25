package com.cupid.joalarm.notice.repository;

import com.cupid.joalarm.notice.entity.Notice;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findTop20ByAccount_AccountSeqOrderBySeqDesc(Long accountSeq);
}
