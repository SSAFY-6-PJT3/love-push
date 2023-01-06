package com.cupid.joalarm.notice.controller;

import com.cupid.joalarm.message.Message;
import com.cupid.joalarm.notice.dto.NoticeDto;
import com.cupid.joalarm.notice.service.NoticeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Api
@RestController
@RequiredArgsConstructor
@RequestMapping("notice")
public class NoticeController {


    private final NoticeService noticeService;
    private final Message message;

    @GetMapping
    @ApiOperation(value = "알림 목록 확인", notes = "최근 알림 20개를 가져옵니다.")
    public ResponseEntity<List<String>> getNotices(@RequestParam Long accountSeq) {
        return new ResponseEntity<>(noticeService.get20NoticeTexts(accountSeq), HttpStatus.ACCEPTED);
    }

    public void addNoticeHeart(long accountSeq) {
        NoticeDto noticeDto = new NoticeDto(accountSeq, "누군가 당신을 좋아하고 있어요! 당신에게 하트가 전달되었습니다!");
        noticeService.save(noticeDto);
        message.notice(accountSeq, noticeDto);
    }

    @PostMapping("/near_by")
    @ApiOperation(value = "근처 사용자 알림", notes = "알림 수신 내역에 해당 값을 추가합니다.")
    public void addNoticeNearBy(@RequestBody long accountSeq) {
        NoticeDto noticeDto = new NoticeDto(accountSeq, "당신을 좋아하는 사람이 근처 100m내에 있어요!");
        noticeService.save(noticeDto);
        message.notice(accountSeq, noticeDto);
    }
}

