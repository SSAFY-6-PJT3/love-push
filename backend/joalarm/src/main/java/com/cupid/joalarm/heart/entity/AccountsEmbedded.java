package com.cupid.joalarm.heart.entity;

import com.cupid.joalarm.account.entity.Account;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.io.Serializable;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Embeddable
public class AccountsEmbedded implements Serializable {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "send_account_id")
    private Account sendAccount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receive_account_id")
    private Account receiveAccount;

}