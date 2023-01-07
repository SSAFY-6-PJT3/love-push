package com.cupid.joalarm.comment.repository;

import com.cupid.joalarm.comment.entity.Comment;
import com.cupid.joalarm.feed.entity.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByFeed(Feed feed);
}
