package com.cupid.joalarm.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class NoticeDto {

    private Long accountSeq;
    private String text;
}
