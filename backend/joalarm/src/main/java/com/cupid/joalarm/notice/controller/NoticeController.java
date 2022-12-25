package com.cupid.joalarm.notice.controller;

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

    @GetMapping
    @ApiOperation(value = "알림 목록 확인", notes = "최근 알림 20개를 가져옵니다.")
    public ResponseEntity<List<String>> getNotices(@RequestParam Long accountSeq) {
        return new ResponseEntity<>(noticeService.get20NoticeTexts(accountSeq), HttpStatus.ACCEPTED);
    }

    @PostMapping
    @ApiOperation(value = "알림 목록 추가", notes = "알림 수신 내역에 해당 값을 추가합니다.")
    public ResponseEntity<?> addNotice(@RequestBody NoticeDto noticeDto) {
        if (noticeService.save(noticeDto)) {
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}

