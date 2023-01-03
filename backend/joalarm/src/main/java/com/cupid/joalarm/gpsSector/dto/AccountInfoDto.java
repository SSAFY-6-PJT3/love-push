package com.cupid.joalarm.gpsSector.dto;

import com.cupid.joalarm.love.dto.LoveDto;
import com.cupid.joalarm.love.entity.Love;
import lombok.Data;

@Data
public class AccountInfoDto {
    private String loverLastName;
    private String loverFirstName;
    private Long schoolSeq;

    public void update(LoveDto loveDto) {
        this.loverLastName = loveDto.getLastName();
        this.loverFirstName = loveDto.getFirstName();
        this.schoolSeq = loveDto.getSchoolSeq();
    }

    public void update(Love love) {
        this.loverLastName = love.getLastName();
        this.loverFirstName = love.getFirstName();
        this.schoolSeq = love.getSchool().getSchoolId();
    }
}
