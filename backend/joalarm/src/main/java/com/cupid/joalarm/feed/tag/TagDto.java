package com.cupid.joalarm.feed.tag;

import io.swagger.annotations.ApiParam;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TagDto {

    @ApiParam(value = "태그 이름")
    private List<String> tagList;
}