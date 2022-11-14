package com.cupid.joalarm.feed.childcomment;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.baseEntity.BaseTimeEntity;
import com.cupid.joalarm.feed.comment.Comment;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "childcomment")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class ChildComment extends BaseTimeEntity {

    @Id
    @Column(name = "childcomment_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(name = "content")
    private String content;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Account account;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "comment_id")
    private Comment comment;
}
