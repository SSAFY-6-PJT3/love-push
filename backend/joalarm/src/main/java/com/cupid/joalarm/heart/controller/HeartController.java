package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.heart.dto.HeartDto;
import com.cupid.joalarm.heart.service.HeartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Api("heart 관련 기능")
@RequiredArgsConstructor
@RestController
public class HeartController {

    private final HeartService heartService;

    @ApiOperation(value = "좋아하는 사람 지정", notes = "좋아하는 사람의 성, 이름, 학교를 등록 및 메시징을 날립니다.")
    @PostMapping("/heart")
    public ResponseEntity<HeartDto> sendHeart(@RequestBody HeartDto heartDto) {
        Optional<HeartDto> heartDtoOptional = heartService.setHeart(heartDto);

        if (heartDtoOptional.isEmpty()) {
            return new ResponseEntity<>(new HeartDto(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(heartDto, HttpStatus.OK);
    }

}
