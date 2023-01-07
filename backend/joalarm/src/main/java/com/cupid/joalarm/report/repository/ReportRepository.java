package com.cupid.joalarm.report.repository;

import com.cupid.joalarm.report.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByCommentSeq(Long commentSeq);
    Report findByChildCommentSeq(Long childCommentSeq);
    Report findByFeedSeq(Long feedSeq);
}
