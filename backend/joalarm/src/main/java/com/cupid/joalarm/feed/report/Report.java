package com.cupid.joalarm.feed.report;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.comment.Comment;
import com.cupid.joalarm.school.School;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "report")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_id")
    private Long reportId;

    @ElementCollection
    @Column(name = "accounts_seq",columnDefinition = "Long[]")
    private List<Long> accounts = new ArrayList<>();

    @Column(name = "comment_seq")
    private Long commentSeq;

    @Column(name = "childComment_seq")
    private Long childCommentSeq;

    @Column(name = "content")
    private String content;

    @Column(name = "report_cnt")
    private Long reportCnt;
}