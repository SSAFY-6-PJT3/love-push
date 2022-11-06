package com.cupid.joalarm.feed.comment;

import io.swagger.annotations.ApiParam;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentListDto {

    @ApiParam(value = "댓글 id")
    private Long commentId;

    @ApiParam(value = "프로필사진")
    private String profileUrl;

    @ApiParam(value = "유저이메일")
    private String email;

    @ApiParam(value = "유저이름")
    private String username;

    @ApiParam(value = "댓글내용")
    private String content;

    @ApiParam(value = "댓글 작성 시각")
    private LocalDateTime createdAt;

}
