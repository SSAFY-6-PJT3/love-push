package com.cupid.joalarm.feed.entity;

import com.cupid.joalarm.school.entity.School;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.comment.entity.Comment;
import com.cupid.joalarm.like.entity.Like;
import com.cupid.joalarm.feed.tag.Tag;
import com.cupid.joalarm.account.entity.Account;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "feed")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
public class Feed extends BaseTimeEntity {

    @Id
    @Column(name = "feed_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedId;

    @Column(name = "content")
    private String content;

    @Column(name = "media_url")
    private String mediaUrl;

    @Column(name = "like_cnt")
    private Long likeCnt;

    @Column(name = "anonymous_cnt")
    private Long anonymousCnt;

    @Builder.Default
    @ManyToMany
    @JoinTable(name = "feed_tag",
            joinColumns = @JoinColumn(name = "feed_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id"))
    private List<Tag> tags = new ArrayList<Tag>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private Account account;

    @Builder.Default
    @OneToMany(mappedBy = "feed",cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"feed"})
    private List<Comment> comments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "feed",cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"feed"})
    private List<Like> likes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "school_id")
    private School school;

    @Column(name = "report_cnt")
    private Long reportCnt;
}
