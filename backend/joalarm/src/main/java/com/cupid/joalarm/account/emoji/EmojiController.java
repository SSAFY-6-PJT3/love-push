package com.cupid.joalarm.account.emoji;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api("emoji s3 기능")
@RestController
@RequestMapping("emojis")
@RequiredArgsConstructor
public class EmojiController {
    private final EmojiS3Service emojiS3Service;

    @PostMapping()
    @ApiOperation(value = "이모지 전체 조회", notes = "자신의 이모지를 담아서 보내면, s3 에 있는 이모지인지 검증 후 가장 첫번재로 담아서 반환합니다.")
    public ResponseEntity<List<String>> getUserFromToken(@RequestBody EmojiDto emojiDto) {
        return ResponseEntity.ok(emojiS3Service.getAllEmojis(emojiDto));
    }

}
