package com.cupid.joalarm.comment.service;

import com.cupid.joalarm.childcomment.repository.ChildCommentRepository;

import com.cupid.joalarm.comment.dto.CommentDto;
import com.cupid.joalarm.comment.dto.CommentListDto;
import com.cupid.joalarm.comment.entity.Comment;
import com.cupid.joalarm.comment.repository.CommentRepository;
import com.cupid.joalarm.feed.entity.Feed;
import com.cupid.joalarm.feed.repository.FeedRepository;
import com.cupid.joalarm.school.repository.SchoolRepository;


import com.cupid.joalarm.util.SecurityUtil;
import com.cupid.joalarm.feed.media.GlobalConfig;
import com.cupid.joalarm.like.repository.LikeRepository;
import com.cupid.joalarm.feed.tag.TagRepository;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class CommentService {

    public FeedRepository feedRepository;
    public AccountRepository accountRepository;
    public CommentRepository commentRepository;
    private GlobalConfig config;
    public TagRepository tagRepository;
    public LikeRepository likeRepository;
    public SecurityUtil securityUtil;
    public ChildCommentRepository childCommentRepository;
    public SchoolRepository schoolRepository;

    @Autowired
    public CommentService(FeedRepository feedRepository, AccountRepository accountRepository, CommentRepository commentRepository, GlobalConfig config, TagRepository tagRepository, LikeRepository likeRepository, SecurityUtil securityUtil, ChildCommentRepository childCommentRepository, SchoolRepository schoolRepository) {
        this.feedRepository = feedRepository;
        this.accountRepository = accountRepository;
        this.commentRepository = commentRepository;
        this.config = config;
        this.tagRepository = tagRepository;
        this.likeRepository = likeRepository;
        this.securityUtil = securityUtil;
        this.childCommentRepository = childCommentRepository;
        this.schoolRepository = schoolRepository;
    }

    //=========================Comment=========================//

    public List<CommentListDto> getComments(Long feed_id) {

        // Get Feed
        Optional<Feed> feed = feedRepository.findById(feed_id);
        if (!feed.isPresent()) {
            return null;
        }
        List<CommentListDto> result = new ArrayList<>();

        for (Comment comment : commentRepository.findByFeed(feed.get())) {
            CommentListDto commentListDto = new CommentListDto();

            commentListDto.setCommentId(comment.getCommentId());
            commentListDto.setUserId(comment.getAccount().getAccountSeq());
            commentListDto.setContent(comment.getContent());
            commentListDto.setCreatedAt(comment.getCreatedAt());

            result.add(commentListDto);
        }

        return result;
    }

    @Transactional
    public ResponseEntity<?> postComment(Long feed_id, CommentDto commentDto, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Feed
        Optional<Feed> feed = feedRepository.findById(feed_id);
        if (!feed.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Build & Save Comment
        Comment comment = Comment.builder()
                .content(commentDto.getContent())
                .feed(feed.get())
                .account(account)
                .likeCnt(0L)
                .anonymousCnt(0L)
                .reportCnt(0L)
                .build();

        commentRepository.save(comment);

        // Update Feed's Anonymous_cnt
        Feed feedAnnoy = feed.get();
        feedAnnoy.setAnonymousCnt(feedAnnoy.getAnonymousCnt()+1);
        feedRepository.save(feedAnnoy);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> deleteComment(Long comment_id) {

        commentRepository.deleteById(comment_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}

