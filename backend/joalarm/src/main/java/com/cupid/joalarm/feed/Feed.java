package com.cupid.joalarm.feed;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.base.entity.BaseTimeEntity;
import com.cupid.joalarm.feed.comment.Comment;
import com.cupid.joalarm.feed.like.Like;
import com.cupid.joalarm.feed.tag.Tag;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

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
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"feed"})
    private List<Comment> comments = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"feed"})
    private List<Like> likes = new ArrayList<>();

    // New added
    @Column(name = "school")
    private String school;

}
