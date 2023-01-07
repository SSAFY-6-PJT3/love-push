package com.cupid.joalarm.like.entity;

import com.cupid.joalarm.comment.entity.Comment;
import com.cupid.joalarm.feed.entity.Feed;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.childcomment.entity.ChildComment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Table(name = "`like`")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long likeId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;

    @ManyToOne
    @JoinColumn(name = "childComment_id")
    private ChildComment childComment;
}