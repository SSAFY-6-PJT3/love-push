package com.cupid.joalarm.feed.dto;

import com.cupid.joalarm.comment.dto.AllCommentDto;
import io.swagger.annotations.ApiParam;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedListDto {

    @ApiParam(value = "피드아이디")
    private Long feedId;

    @ApiParam(value = "유저이름")
    private String username;

    @ApiParam(value = "피드 작성자 seq")
    private Long userId;

    @ApiParam(value = "피드사진")
    private String mediaUrl;

    @ApiParam(value = "댓글 수")
    private Long commentCnt;

    @ApiParam(value = "좋아요개수")
    private Long likeCnt;

    @ApiParam(value = "피드내용")
    private String content;

    @ApiParam(value = "게시판 종류")
    private List<String> tags;

    @ApiParam(value = "게시 날짜시간")
    private LocalDateTime createdAt;

    @ApiParam(value = "수정 날짜시간")
    private LocalDateTime updatedAt;

    @ApiParam(value = "좋아요 여부")
    private Boolean likeStatus;

    @ApiParam(value = "학교")
    private String school;

    @ApiParam(value = "유저학교")
    private String userSchool;

    @ApiParam(value = "댓글+대댓글")
    private List<AllCommentDto> allComments;

    @ApiParam(value = "익명 카운트")
    private Long anonymousCnt;
}
