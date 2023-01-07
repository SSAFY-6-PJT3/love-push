package com.cupid.joalarm.feed.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Column;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedDto {

    private Long feedId;

    @ApiParam(value = "피드 내용")
    @NotNull
    private String content;

    @ApiParam(value = "게시판 종류")
    private List<String> tags;

    @ApiParam(value = "게시 날짜시간")
    private LocalDateTime createdAt;

    @ApiParam(value = "수정 날짜시간")
    private LocalDateTime updatedAt;

//    @ApiParam(value = "피드 첨부파일")
//    private MultipartFile media;

    @ApiParam(value = "피드 첨부파일 저장 경로")
    private String mediaUrl;

    @ApiParam(value = "피드 좋아요 수")
    private Long likeCnt;

    @ApiParam(value = "피드 작성자")
    private String username;

    @ApiParam(value = "피드 작성자 seq")
    private Long userId;

    @ApiParam(value = "좋아요 여부")
    private Boolean likeStatus;

    @ApiParam(value = "댓글+대댓글 갯수")
    private Long commentCnt;

    @ApiParam(value = "학교")
    private String school;

    @ApiParam(value = "익명 카운트")
    private Long anonymousCnt;
}
