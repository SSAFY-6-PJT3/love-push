package com.cupid.joalarm.feed.childcomment;

import com.cupid.joalarm.feed.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildCommentRepository extends JpaRepository<ChildComment, Long> {

    List<ChildComment> findByComment(Comment comment);
}
