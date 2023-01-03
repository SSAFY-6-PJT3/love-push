package com.cupid.joalarm.feed.like;

import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.comment.Comment;
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