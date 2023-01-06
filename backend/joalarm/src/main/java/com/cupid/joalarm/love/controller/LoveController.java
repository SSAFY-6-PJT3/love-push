package com.cupid.joalarm.love.controller;

import com.cupid.joalarm.message.Message;
import com.cupid.joalarm.gpsSector.dto.AccountInfoDto;
import com.cupid.joalarm.love.dto.LoveDto;
import com.cupid.joalarm.love.service.LoveService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Api("love 관련 기능")
@RequiredArgsConstructor
@RestController
public class LoveController {

    private final LoveService heartService;
    private final Message message;

    @ApiOperation(value = "좋아하는 사람 지정", notes = "좋아하는 사람의 성, 이름, 학교를 등록 및 메시징을 날립니다.")
    @PutMapping("/love")
    public ResponseEntity<LoveDto> sendHeart(@RequestBody LoveDto loveDto) {
        Optional<LoveDto> heartDtoOptional = heartService.setLove(loveDto);

        if (heartDtoOptional.isEmpty()) {
            return new ResponseEntity<>(new LoveDto(), HttpStatus.BAD_REQUEST);
        }

        message.love(heartDtoOptional.get());

        AccountInfoDto info = (AccountInfoDto) SimpAttributesContextHolder.currentAttributes()
                .getAttribute("INFO");

        if (null != info) {
            info.update(loveDto);
        }

        return new ResponseEntity<>(loveDto, HttpStatus.OK);
    }

}
