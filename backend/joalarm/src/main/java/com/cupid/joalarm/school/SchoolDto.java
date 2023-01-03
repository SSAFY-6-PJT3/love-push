package com.cupid.joalarm.school;
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
public class SchoolDto {

    private Long schoolId;

    @ApiParam(value = "학교 이름")
    @NotNull
    private String name;

    @ApiParam(value = "위도")
    private String latitude;

    @ApiParam(value = "경도")
    private String longitude;

    @ApiParam(value = "초/중/고 종류")
    private String kind;

}
