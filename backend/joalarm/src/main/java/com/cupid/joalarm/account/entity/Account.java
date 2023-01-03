package com.cupid.joalarm.account.entity;

import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.school.School;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "accounts")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString(exclude = "schools")
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

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "school_id")
    private School school;


}

