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
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

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
                .lastName(heartDto.getLoverLastName())
                .firstName(heartDto.getLoverFirstName())
                .school(school)
                .build();
    }
}
