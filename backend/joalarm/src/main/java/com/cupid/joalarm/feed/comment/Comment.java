package com.cupid.joalarm.feed.comment;

import com.cupid.joalarm.baseEntity.BaseTimeEntity;
import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.account.entity.Account;
import lombok.*;

import javax.persistence.*;

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
}
