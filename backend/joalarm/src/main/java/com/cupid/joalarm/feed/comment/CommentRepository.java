package com.cupid.joalarm.feed.comment;

import com.cupid.joalarm.feed.Feed;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByFeed(Feed feed);
}
