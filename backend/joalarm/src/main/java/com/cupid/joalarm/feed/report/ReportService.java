package com.cupid.joalarm.feed.report;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.feed.FeedRepository;
import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.childcomment.ChildCommentRepository;
import com.cupid.joalarm.feed.comment.Comment;
import com.cupid.joalarm.feed.comment.CommentRepository;
import com.cupid.joalarm.feed.like.Like;
import com.cupid.joalarm.feed.like.LikeRepository;
import com.cupid.joalarm.feed.like.LikeUserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import java.sql.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private AccountRepository accountRepository;
    private FeedRepository feedRepository;
    private ReportRepository reportRepository;
    private CommentRepository commentRepository;
    private ChildCommentRepository childCommentRepository;

    @Autowired
    public ReportService(AccountRepository accountRepository, FeedRepository feedRepository, ReportRepository reportRepository, CommentRepository commentRepository, ChildCommentRepository childCommentRepository) {
        this.accountRepository = accountRepository;
        this.feedRepository = feedRepository;
        this.reportRepository = reportRepository;
        this.commentRepository = commentRepository;
        this.childCommentRepository = childCommentRepository;
    }

    @Transactional
    public ResponseEntity<?> reportFeed(Long feed_id, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Feed
        Feed feed = feedRepository.getById(feed_id);

        Long nowReportCnt = feed.getReportCnt();

        feed.setReportCnt(feed.getReportCnt()+1);
        feedRepository.save(feed);

        if (nowReportCnt < 5) {
        } else if (nowReportCnt.equals(5L)){
            Report report = Report.builder()
                    .reportCnt(5L)
                    .feedSeq(feed.getFeedId())
                    .content(feed.getContent())
                    .build();
            reportRepository.save(report);

            feed.setContent("신고된 댓글입니다");
            feedRepository.save(feed);
        } else {
            Report report = reportRepository.findByFeedSeq(feed.getFeedId());
            report.setReportCnt(report.getReportCnt()+1);
            reportRepository.save(report);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> reportComment(Long comment_id, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Comment
        Comment comment = commentRepository.getById(comment_id);

        Long nowReportCnt = comment.getReportCnt();

        comment.setReportCnt(comment.getReportCnt()+1);
        commentRepository.save(comment);

        if (nowReportCnt < 5) {
        } else if (nowReportCnt.equals(5L)){
            Report report = Report.builder()
                    .reportCnt(5L)
                    .commentSeq(comment.getCommentId())
                    .content(comment.getContent())
                    .build();
            reportRepository.save(report);

            comment.setContent("신고된 댓글입니다");
            commentRepository.save(comment);
        } else {
            Report report = reportRepository.findByCommentSeq(comment.getCommentId());
            report.setReportCnt(report.getReportCnt()+1);
            reportRepository.save(report);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> reportChildComment(Long childComment_id, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get ChildComment
        ChildComment childComment = childCommentRepository.getById(childComment_id);

        Long nowReportCnt = childComment.getReportCnt();

        childComment.setReportCnt(childComment.getReportCnt()+1);
        childCommentRepository.save(childComment);

        if (nowReportCnt < 5) {
        } else if (nowReportCnt.equals(5L)){
            Report report = Report.builder()
                    .reportCnt(5L)
                    .childCommentSeq(childComment.getChildId())
                    .content(childComment.getContent())
                    .build();
            reportRepository.save(report);

            childComment.setContent("신고된 댓글입니다");
            childCommentRepository.save(childComment);
        } else {
            Report report = reportRepository.findByChildCommentSeq(childComment.getChildId());
            report.setReportCnt(report.getReportCnt()+1);
            reportRepository.save(report);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public List<ReportDto> getReports() {

        List<ReportDto> result = new ArrayList<>();

        for (Report report : reportRepository.findAll()) {
            ReportDto reportDto = new ReportDto();

            reportDto.setReportId(report.getReportId());
            reportDto.setReportCnt(report.getReportCnt());
            reportDto.setContent(report.getContent());
            reportDto.setFeedSeq(report.getFeedSeq());
            reportDto.setCommentSeq(report.getCommentSeq());
            reportDto.setChildCommentSeq(report.getChildCommentSeq());

            result.add(reportDto);
        }

        return result;
    }
}
