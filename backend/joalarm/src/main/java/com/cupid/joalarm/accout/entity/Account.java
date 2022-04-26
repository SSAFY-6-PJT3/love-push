package com.cupid.joalarm.accout.entity;

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
    @Column(name = "emoji", length = 50)
    private String emoji;

    @Column(name = "report_cnt")
    private int reportedCnt;
}
