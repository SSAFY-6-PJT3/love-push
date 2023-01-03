package com.cupid.joalarm.feed.like;

import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.feed.FeedRepository;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.childcomment.ChildCommentRepository;
import com.cupid.joalarm.feed.comment.Comment;
import com.cupid.joalarm.feed.comment.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class LikeService {

    private AccountRepository accountRepository;
    private FeedRepository feedRepository;
    private LikeRepository likeRepository;
    private CommentRepository commentRepository;
    private ChildCommentRepository childCommentRepository;

    @Autowired
    public LikeService(AccountRepository accountRepository, FeedRepository feedRepository, LikeRepository likeRepository, CommentRepository commentRepository, ChildCommentRepository childCommentRepository) {
        this.accountRepository = accountRepository;
        this.feedRepository = feedRepository;
        this.likeRepository = likeRepository;
        this.commentRepository = commentRepository;
        this.childCommentRepository = childCommentRepository;
    }

//    =========================== Feed =================================
    @Transactional
    public ResponseEntity<?> likeFeed(Long feed_id, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Feed
        Feed feed = feedRepository.getById(feed_id);

        // Check Status Like
        if (likeRepository.findByAccountAndFeed(account, feed) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Build & Save Like
        Like like = Like.builder()
                .account(account)
                .feed(feed)
                .build();

        likeRepository.save(like);

        // Update Feed's like_cnt
        feed.setLikeCnt(feed.getLikeCnt()+1);
        feedRepository.save(feed);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public List<LikeUserDto> getLikeUsers(Long feed_id, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Feed
        Optional<Feed> feed = feedRepository.findById(feed_id);
        if (!feed.isPresent()) {
            return null;
        }
        List<LikeUserDto> result = new ArrayList<>();

        for (Like like : likeRepository.findAllByFeed(feed.get())) {
            LikeUserDto likeUserDto = new LikeUserDto();

            likeUserDto.setUsername(like.getAccount().getId());

            result.add(likeUserDto);
        }

        return result;
    }

    @Transactional
    public ResponseEntity<?> undoLikeFeed(Long feed_id, String user) {

        // Get Feed
        Optional<Feed> optFeed = feedRepository.findById(feed_id);// Check Like Status
        if (!optFeed.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Feed feed = optFeed.get();

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Like
        Like like = likeRepository.findByAccountAndFeed(account, feed);

        if (like != null) {

            likeRepository.delete(like);

            // Update Feed's like_cnt
            feed.setLikeCnt(feed.getLikeCnt() - 1);
            feedRepository.save(feed);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //    =========================== Comment =================================
    @Transactional
    public ResponseEntity<?> likeComment(Long comment_id, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Comment
        Comment comment = commentRepository.getById(comment_id);

        // Check Status Like
        if (likeRepository.findByAccountAndComment(account, comment) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Build & Save Like
        Like like = Like.builder()
                .account(account)
                .comment(comment)
                .build();

        likeRepository.save(like);

        // Update Comment's like_cnt
        comment.setLikeCnt(comment.getLikeCnt()+1);
        commentRepository.save(comment);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> undoLikeComment(Long comment_id, String user) {

        // Get comment
        Optional<Comment> optComment = commentRepository.findById(comment_id);// Check Like Status
        if (!optComment.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Comment comment = optComment.get();

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Like
        Like like = likeRepository.findByAccountAndComment(account, comment);

        if (like != null) {

            likeRepository.delete(like);

            // Update Comment's like_cnt
            comment.setLikeCnt(comment.getLikeCnt() - 1);
            commentRepository.save(comment);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    //    =========================== ChildComment =================================
    @Transactional
    public ResponseEntity<?> likeChildComment(Long childComment_id, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get ChildComment
        ChildComment childComment = childCommentRepository.getById(childComment_id);

        // Check Status Like
        if (likeRepository.findByAccountAndChildComment(account, childComment) != null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // Build & Save Like
        Like like = Like.builder()
                .account(account)
                .childComment(childComment)
                .build();

        likeRepository.save(like);

        // Update ChildComment's like_cnt
        childComment.setLikeCnt(childComment.getLikeCnt()+1);
        childCommentRepository.save(childComment);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> undoLikeChildComment(Long childComment_id, String user) {

        // Get childcomment
        Optional<ChildComment> optChildComment = childCommentRepository.findById(childComment_id);// Check Like Status
        if (!optChildComment.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        ChildComment childComment = optChildComment.get();

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Like
        Like like = likeRepository.findByAccountAndChildComment(account, childComment);

        if (like != null) {

            likeRepository.delete(like);

            // Update ChildComment's like_cnt
            childComment.setLikeCnt(childComment.getLikeCnt() - 1);
            childCommentRepository.save(childComment);

            return new ResponseEntity<>(HttpStatus.OK);
        } else {

            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
