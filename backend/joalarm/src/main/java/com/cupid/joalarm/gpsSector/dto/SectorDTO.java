package com.cupid.joalarm.gpsSector.dto;

import lombok.Data;

@Data
public class SectorDTO {
    private String beforeGpsKey;
    private String nowGpsKey;
    private AccountInfoDto accountInfoDto;
}
