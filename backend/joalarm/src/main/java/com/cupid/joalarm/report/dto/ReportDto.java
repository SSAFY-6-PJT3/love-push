package com.cupid.joalarm.report.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReportDto {

    @ApiParam(value = "리포트아이디")
    private Long reportId;

    @ApiParam(value = "유저리스트")
    private List<Long> accounts;

    @ApiParam(value = "피드seq")
    private Long feedSeq;

    @ApiParam(value = "댓글seq")
    private Long commentSeq;

    @ApiParam(value = "대댓글seq")
    private Long childCommentSeq;

    @ApiParam(value = "내용")
    private String content;

    @ApiParam(value = "신고횟수")
    private Long reportCnt;
}
