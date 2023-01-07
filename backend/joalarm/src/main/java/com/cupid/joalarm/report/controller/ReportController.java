package com.cupid.joalarm.report.controller;

import com.cupid.joalarm.report.dto.ReportDto;
import com.cupid.joalarm.report.service.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("'신고' 기능 접근 방법")
@RestController
@RequestMapping("/feed")
public class ReportController {

    private ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @ApiOperation(value = "피드 신고 추가", notes = "피드 신고 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 신고를 성공적으로 추가했습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @PostMapping({"/reports/feeds/{feed_id}/{user}"})
    public ResponseEntity reportFeed(@PathVariable Long feed_id, @PathVariable String user) {
        return reportService.reportFeed(feed_id, user);
    }

    @ApiOperation(value = "댓글 신고 추가", notes = "댓글 신고 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "댓글 신고를 성공적으로 추가했습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @PostMapping({"/reports/comments/{comment_id}/{user}"})
    public ResponseEntity reportComment(@PathVariable Long comment_id, @PathVariable String user) {
        return reportService.reportComment(comment_id, user);
    }

    @ApiOperation(value = "대댓글 신고 추가", notes = "대댓글 신고 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "대댓글 신고를 성공적으로 추가했습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @PostMapping({"/reports/childcomments/{childComment_id}/{user}"})
    public ResponseEntity reportChildComment(@PathVariable Long childComment_id, @PathVariable String user) {
        return reportService.reportChildComment(childComment_id, user);
    }


    @ApiOperation(value = "신고 정보 전체 조회", notes = "신고 정보 전체 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "신고 정보 조회를 성공적으로 실행했습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @GetMapping({"/reports"})
    public ResponseEntity<List<ReportDto>> getReports() {
        return ResponseEntity.ok(reportService.getReports());
    }
}
