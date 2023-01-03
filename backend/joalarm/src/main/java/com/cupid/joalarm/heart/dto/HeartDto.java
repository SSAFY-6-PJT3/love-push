package com.cupid.joalarm.heart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class HeartDto {
    private long sendAccountSeq;
    private long receiveAccountSeq;
}
