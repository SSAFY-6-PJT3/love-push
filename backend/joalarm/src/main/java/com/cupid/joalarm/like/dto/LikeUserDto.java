package com.cupid.joalarm.like.dto;

import io.swagger.annotations.ApiParam;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LikeUserDto {

    @ApiParam(value = "유저아이디")
    private Long userId;

    @ApiParam(value = "유저이름")
    private String username;
}
