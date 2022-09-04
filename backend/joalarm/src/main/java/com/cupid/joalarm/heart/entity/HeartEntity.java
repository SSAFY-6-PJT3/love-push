package com.cupid.joalarm.heart.entity;

import com.cupid.joalarm.embeddable.AccountsEmbedded;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "heart")

public class HeartEntity {

    @EmbeddedId
    private AccountsEmbedded sendReceiveAccount;
}
