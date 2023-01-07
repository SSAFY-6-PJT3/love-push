package com.cupid.joalarm.comment.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

    private Long commentId;

    @ApiParam(value = "유저 id")
    private Long userId;

    @ApiParam(value = "댓글 작성 시각")
    private LocalDateTime createdAt;

    @ApiParam(value = "댓글 내용")
    private String content;

    @ApiParam(value = "댓글 좋아요 수")
    private Long likeCnt;

    @ApiParam(value = "익명 카운트")
    private Long anonymousCnt;

    @ApiParam(value = "좋아요 여부")
    private Boolean likeStatus;
}