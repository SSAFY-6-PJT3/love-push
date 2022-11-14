package com.cupid.joalarm.feed.childcomment;

import io.swagger.annotations.ApiParam;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChildCommentDto {

    private Long commentId;

    @ApiParam(value = "댓글 작성 시각")
    private LocalDateTime createdAt;

    @ApiParam(value = "댓글 내용")
    private String content;

    @ApiParam(value = "댓글 작성자 아이디")
    private String userId;

    @ApiParam(value = "댓글 작성자 이름")
    private String username;

    @ApiParam(value = "댓글 해당 피드ID")
    private Long feedId;
}
