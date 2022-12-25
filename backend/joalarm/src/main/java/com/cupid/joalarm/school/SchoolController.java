package com.cupid.joalarm.school;

import com.cupid.joalarm.feed.FeedDto;
import com.cupid.joalarm.feed.FeedService;
import com.cupid.joalarm.feed.tag.TagDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("피드 관련 기능 접근 방법")
@RestController
@RequestMapping("/school")
public class SchoolController {

    private SchoolService schoolService;

    @Autowired
    public SchoolController(SchoolService schoolService) {
        this.schoolService = schoolService;
    }

    @ApiOperation(value = "학교 등록", notes = "학교 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "학교 등록에 성공하였습니다."),
            @ApiResponse(code = 400, message = "잘못된 요청입니다."),
            @ApiResponse(code = 500, message = "서버 에러입니다.")
    })
    @PostMapping("/schools")
    public ResponseEntity<?> postFeed(@RequestBody SchoolDto schoolDto){
        return schoolService.enrollSchool(schoolDto);
    }

    @ApiOperation(value = "학교 조회", notes = "학교 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "학교 조회에 성공하였습니다."),
            @ApiResponse(code = 400, message = "잘못된 요청입니다."),
            @ApiResponse(code = 500, message = "서버 에러입니다.")
    })
    @GetMapping("/schools/{seq}")
    public String postFeed(@PathVariable String seq){
        long longSeq = Long.parseLong(seq);
        return schoolService.findSchool(longSeq);
    }
}
