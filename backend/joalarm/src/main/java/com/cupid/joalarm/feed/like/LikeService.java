package com.cupid.joalarm.feed.like;

import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.feed.FeedRepository;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import com.cupid.joalarm.util.SecurityUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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
    private SecurityUtil securityUtil;

    @Autowired
    public LikeService(AccountRepository accountRepository, FeedRepository feedRepository, LikeRepository likeRepository, SecurityUtil securityUtil) {
        this.accountRepository = accountRepository;
        this.feedRepository = feedRepository;
        this.likeRepository = likeRepository;
        this.securityUtil = securityUtil;
    }

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
}
