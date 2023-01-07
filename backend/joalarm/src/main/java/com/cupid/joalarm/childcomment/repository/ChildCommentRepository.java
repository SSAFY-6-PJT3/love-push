package com.cupid.joalarm.childcomment.repository;

import com.cupid.joalarm.childcomment.entity.ChildComment;
import com.cupid.joalarm.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChildCommentRepository extends JpaRepository<ChildComment, Long> {

    List<ChildComment> findByComment(Comment comment);
}
