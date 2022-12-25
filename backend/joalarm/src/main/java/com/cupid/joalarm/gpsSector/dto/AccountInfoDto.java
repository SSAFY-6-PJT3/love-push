package com.cupid.joalarm.gpsSector.dto;

import com.cupid.joalarm.love.dto.LoveDto;
import lombok.Data;

@Data
public class AccountInfoDto {
    private String gpsKey;
    private String emojiUrl;
    private String lastName;
    private String firstName;
    private Long schoolSeq;
}
