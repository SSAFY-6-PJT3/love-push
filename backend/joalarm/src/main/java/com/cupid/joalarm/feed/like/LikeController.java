package com.cupid.joalarm.feed.like;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("'좋아요' 기능 접근 방법")
@RestController
@RequestMapping("/feed")
public class LikeController {

    private LikeService likeService;

    @Autowired
    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    //=========================Like=========================//

    @ApiOperation(value = "좋아요 추가", notes = "좋아요 추가")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드를 성공적으로 조회했습니다."),
            @ApiResponse(code = 400, message = "이미 좋아요 상태입니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @PostMapping({"/{feed_id}/likes/{user}"})
    public ResponseEntity likeFeed(@PathVariable Long feed_id, @PathVariable String user) {
        return likeService.likeFeed(feed_id, user);
    }

    @ApiOperation(value = "좋아요한 사람들 조회", notes = "좋아요한 사람들 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "조회를 성공적으로 실행했습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @GetMapping({"/{feed_id}/likes/{user}"})
    public ResponseEntity<List<LikeUserDto>> getLikeUsers(@PathVariable Long feed_id, @PathVariable String user) {
        return ResponseEntity.ok(likeService.getLikeUsers(feed_id,user));
    }

    @ApiOperation(value = "좋아요 취소", notes = "좋아요 취소")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드를 성공적으로 실행했습니다."),
            @ApiResponse(code = 400, message = "요청한 피드가 없거나, 좋아요 상태가 아닙니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @DeleteMapping({"/{feed_id}/likes/{user}"})
    public ResponseEntity<?> unlikeFeed(@PathVariable Long feed_id, @PathVariable String user) {
        return likeService.undoLikeFeed(feed_id, user);
    }
}
