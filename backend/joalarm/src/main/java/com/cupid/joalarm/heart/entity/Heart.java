package com.cupid.joalarm.heart.entity;

import com.cupid.joalarm.baseEntity.BaseTimeEntity;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@Getter
public class Heart extends BaseTimeEntity {

    @EmbeddedId
    private AccountsEmbedded AccountsWhoExchangedHearts;
}