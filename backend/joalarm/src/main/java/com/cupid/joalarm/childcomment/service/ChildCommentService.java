package com.cupid.joalarm.childcomment.service;

import com.cupid.joalarm.childcomment.entity.ChildComment;
import com.cupid.joalarm.childcomment.dto.ChildCommentDto;
import com.cupid.joalarm.childcomment.dto.ChildCommentListDto;
import com.cupid.joalarm.childcomment.repository.ChildCommentRepository;

import com.cupid.joalarm.comment.entity.Comment;
import com.cupid.joalarm.comment.repository.CommentRepository;
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
public class ChildCommentService {

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
    public ChildCommentService(FeedRepository feedRepository, AccountRepository accountRepository, CommentRepository commentRepository, GlobalConfig config, TagRepository tagRepository, LikeRepository likeRepository, SecurityUtil securityUtil, ChildCommentRepository childCommentRepository, SchoolRepository schoolRepository) {
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

    public List<ChildCommentListDto> getChildComments(Long comment_id) {

        // Get Comment
        Optional<Comment> comment = commentRepository.findById(comment_id);
        if (!comment.isPresent()) {
            return null;
        }
        List<ChildCommentListDto> result = new ArrayList<>();

        for (ChildComment childComment : childCommentRepository.findByComment(comment.get())) {
            ChildCommentListDto childCommentListDto = new ChildCommentListDto();

            childCommentListDto.setChildId(childComment.getChildId());
            childCommentListDto.setUserId(childComment.getAccount().getAccountSeq());
            childCommentListDto.setContent(childComment.getContent());
            childCommentListDto.setCreatedAt(childComment.getCreatedAt());
            childCommentListDto.setCommentId(childComment.getComment().getCommentId());

            result.add(childCommentListDto);
        }

        return result;
    }

    public ChildCommentDto getChildComment(Long comment_id, Long childId) {

        // Get Comment
        Optional<ChildComment> childCommentOpt = childCommentRepository.findById(childId);
        ChildComment childComment = childCommentOpt.get();

        ChildCommentDto childCommentDto = new ChildCommentDto();

        childCommentDto.setChildId(childComment.getChildId());
        childCommentDto.setUserId(childComment.getAccount().getAccountSeq());
        childCommentDto.setContent(childComment.getContent());
        childCommentDto.setCreatedAt(childComment.getCreatedAt());
        childCommentDto.setCommentId(childComment.getComment().getCommentId());

        return childCommentDto;
    }

    @Transactional
    public ResponseEntity<?> postChildComment(Long comment_id, ChildCommentDto childCommentDto, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Comment
        Optional<Comment> comment = commentRepository.findById(comment_id);
        if (!comment.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Build & Save Comment
        ChildComment childComment = ChildComment.builder()
                .content(childCommentDto.getContent())
                .likeCnt(0L)
                .comment(comment.get())
                .account(account)
                .reportCnt(0L)
                .build();

        childCommentRepository.save(childComment);

        // Update Comment's Anonymous_cnt
        Comment commentAnnoy = comment.get();
        commentAnnoy.setAnonymousCnt(commentAnnoy.getAnonymousCnt()+1);
        commentRepository.save(commentAnnoy);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> deleteChildComment(Long child_comment_id) {

        childCommentRepository.deleteById(child_comment_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}

