package com.cupid.joalarm.feed.like;

import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {

    Like findByAccountAndFeed(Account account, Feed feed);
    List<Like> findAllByFeed(Feed feed);

    Like findByAccountAndComment(Account account, Comment comment);
    List<Like> findAllByComment(Comment comment);

    Like findByAccountAndChildComment(Account account, ChildComment childComment);
    List<Like> findAllByChildComment(ChildComment childComment);
}
