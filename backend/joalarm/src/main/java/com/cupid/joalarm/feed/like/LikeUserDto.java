package com.cupid.joalarm.feed.like;

import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeUserDto {

    @ApiParam(value = "프로필사진")
    private String profileUrl;

    @ApiParam(value = "유저이메일")
    private String email;

    @ApiParam(value = "유저이름")
    private String username;

    @ApiParam(value = "자기소개")
    private String introduce;

    @ApiParam(value = "팔로우 유무")
    private Boolean checkFollowing;
}
