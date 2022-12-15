package com.cupid.joalarm.heart.entity;

import com.cupid.joalarm.base.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class Heart extends BaseTimeEntity {

    @EmbeddedId
    private AccountsEmbedded AccountsWhoExchangedHearts;
}
