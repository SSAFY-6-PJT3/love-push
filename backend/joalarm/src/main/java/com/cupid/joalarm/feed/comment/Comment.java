package com.cupid.joalarm.feed.comment;

import com.cupid.joalarm.baseEntity.BaseTimeEntity;
import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.like.Like;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "comment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Comment extends BaseTimeEntity {

    @Id
    @Column(name = "comment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @Builder.Default
    @OneToMany(mappedBy = "comment",cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"comment"})
    private List<ChildComment> childComments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "comment",cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"comment"})
    private List<Like> likes = new ArrayList<>();

    @Column(name = "like_cnt")
    private Long likeCnt;
}
