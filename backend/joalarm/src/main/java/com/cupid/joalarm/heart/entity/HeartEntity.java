package com.cupid.joalarm.heart.entity;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.heart.dto.HeartDto;
import com.cupid.joalarm.school.School;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
public class HeartEntity {

    @Id
    @Column(name = "account_seq")
    private Long heartSeq;

    @OneToOne
    @MapsId
    @JoinColumn(name = "account_seq", referencedColumnName = "account_seq")
    private Account account;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "first_name")
    private String firstName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "school_seq")
    private School school;

    public static HeartEntity convert(Account account, HeartDto heartDto, School school) {
        return HeartEntity.builder()
                .account(account)
                .lastName(heartDto.getLastName())
                .firstName(heartDto.getFirstName())
                .school(school)
                .build();
    }

    public void changeLover(String firstName, String lastName, School school) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.school = school;
    }
}
