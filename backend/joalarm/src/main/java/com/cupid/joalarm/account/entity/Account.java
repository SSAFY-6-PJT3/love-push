package com.cupid.joalarm.account.entity;

import com.cupid.joalarm.feed.Feed;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Account {
    @Id
    @Column(name = "account_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountSeq;

    @Column(name = "id", length = 50, unique = true)
    private String id;

    @Column(name = "password", length = 100)
    private String password;

    @Setter
    @Column(name = "emoji")
    private String emoji;

    @Column(name = "report_cnt")
    private int reportedCnt;

    @Column(name = "name", length = 5, unique = true)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_id")
    private Feed school;
}
