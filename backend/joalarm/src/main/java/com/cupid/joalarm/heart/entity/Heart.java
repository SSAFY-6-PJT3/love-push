package com.cupid.joalarm.heart.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Document(collection = "heart")
@Builder
public class Heart extends BaseTimeEntity {

    @EmbeddedId
    private AccountsEmbedded sendReceiveAccount;
}
