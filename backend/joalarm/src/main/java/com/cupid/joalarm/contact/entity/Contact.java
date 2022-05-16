package com.cupid.joalarm.contact.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "contacts")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Contact {
    @Id
    @Column(name = "contact_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contactSeq;

    @Column(name = "type")
    private String type;

    @Column(name = "content")
    private String content;
}
