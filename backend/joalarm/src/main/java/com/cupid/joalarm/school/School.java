package com.cupid.joalarm.school;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.baseEntity.BaseTimeEntity;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "school")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class School extends BaseTimeEntity {

    @Id
    @Column(name = "school_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long schoolId;

    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

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
}
