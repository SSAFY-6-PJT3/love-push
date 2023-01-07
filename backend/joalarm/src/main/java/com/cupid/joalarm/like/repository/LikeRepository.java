package com.cupid.joalarm.like.repository;

import com.cupid.joalarm.feed.entity.Feed;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.childcomment.entity.ChildComment;
import com.cupid.joalarm.comment.entity.Comment;
import com.cupid.joalarm.like.entity.Like;
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
