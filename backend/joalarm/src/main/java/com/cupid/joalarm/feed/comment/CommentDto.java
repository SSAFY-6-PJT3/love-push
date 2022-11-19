package com.cupid.joalarm.feed.comment;

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
}
