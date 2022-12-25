package com.cupid.joalarm.gpsSector.dto;

import com.cupid.joalarm.love.dto.LoveDto;
import lombok.Data;

@Data
public class AccountInfoDto {
    private Long userSeq;
    private String emojiUrl;
    private String loverLastName;
    private String loverFirstName;
    private Long schoolSeq;

    public void update(LoveDto loveDto) {
        this.loverLastName = loveDto.getLastName();
        this.loverFirstName = loveDto.getFirstName();
        this.schoolSeq = loveDto.getSchoolSeq();
    }
}
