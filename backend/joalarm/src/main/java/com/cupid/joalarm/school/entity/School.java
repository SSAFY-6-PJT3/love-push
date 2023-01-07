package com.cupid.joalarm.school.entity;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.entity.Feed;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "schools")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class School{

    @Id
    @Column(name = "school_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schoolId;

    @Column(name = "name")
    private String name;

    @Column(name = "latitude")
    private String latitude;

    @Column(name = "longitude")
    private String longitude;

    @Column(name = "kind")
    private String kind;

    @Builder.Default
    @OneToMany(mappedBy = "school",cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"school"})
    private List<Account> accounts = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "school",cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"school"})
    private List<Feed> feeds = new ArrayList<>();
}
