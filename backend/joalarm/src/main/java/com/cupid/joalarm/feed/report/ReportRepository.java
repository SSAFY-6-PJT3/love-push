package com.cupid.joalarm.feed.report;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.comment.Comment;
import com.cupid.joalarm.feed.like.Like;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findByCommentSeq(Long commentSeq);
    Report findByChildCommentSeq(Long childCommentSeq);
}
