package com.cupid.joalarm.feed;

import com.cupid.joalarm.feed.comment.CommentDto;
import com.cupid.joalarm.feed.comment.CommentListDto;
import com.cupid.joalarm.feed.tag.TagDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("피드 관련 기능 접근 방법")
@RestController
@RequestMapping("/feed")
public class FeedController {

    private FeedService feedService;

    @Autowired
    public FeedController(FeedService feedService) {
        this.feedService = feedService;
    }


    //=========================Feed=========================//

    @ApiOperation(value = "피드 등록", notes = "피드 등록")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 생성에 성공하였습니다."),
            @ApiResponse(code = 400, message = "잘못된 요청입니다. 계정을 명시하지 않았거나 로그인 정보와 맞지 않습니다. 또는 존재하지 않는 미디어 파일입니다."),
            @ApiResponse(code = 500, message = "서버 에러입니다.")
    })
    @PostMapping("/feeds/{user}")
    public ResponseEntity<?> postFeed(@PathVariable String user, @ModelAttribute FeedDto feedDto, TagDto tagDto ){
        return feedService.postFeed(user,feedDto,tagDto);
    }

    @ApiOperation(value = "피드 전체 조회", notes = "전체 피드를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 조회에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })

    @GetMapping("/feeds/list/{user}")
    public List<FeedDto> getAllFeeds(@PathVariable String user) {
        return feedService.getAllFeeds(user);
    }


    @ApiOperation(value = "유저 피드 조회(1)", notes = "내가 작성한 피드를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 사용자의 피드 조회에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @GetMapping("/feeds/profiles/{email}")
    public ResponseEntity<List<FeedDto>> getProfileFeeds(@PathVariable String email, @PathVariable String user) {
        return ResponseEntity.ok(feedService.getProfileFeeds(email, user));
    }

    @ApiOperation(value = "피드 개별 조회", notes = "개별 피드를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 조회에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @GetMapping("/feeds/{feed_id}")
    public FeedListDto getFeed(@PathVariable("feed_id") Long feedId, @PathVariable String user) {
        return feedService.getFeed(feedId, user);
    }

    @ApiOperation(value = "피드리스트 조회(검색)", notes = "전체 피드리스트(검색)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드리스트 조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러입니다.")
    })
    @GetMapping("/feeds/search")
    public ResponseEntity<List<FeedListDto>> getSearchFeeds(@PathVariable String user) {
        return ResponseEntity.ok(feedService.getSearchFeeds(user));
    }

    @ApiOperation(value = "유저 피드 조회(2)", notes = "유저가 작성한 피드 리스트(프로필)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "유저가 작성한 피드 리스트 조회 성공"),
            @ApiResponse(code = 500, message = "서버 에러입니다.")
    })
    @GetMapping("/feeds/profiles/{email}/temp")
    public ResponseEntity<List<FeedProfileDto>> getProfileFeeds_temp(@PathVariable String email,@PathVariable String user) {
        return ResponseEntity.ok(feedService.getProfileFeeds_temp(email,user));
    }

//    @ApiOperation(value = "피드 수정(조회)", notes = "피드 수정(조회)")
//    @ApiResponses({
//            @ApiResponse(code = 200, message = "피드 수정에 성공하였습니다."),
//            @ApiResponse(code = 500, message = "서버 에러입니다.")
//    })
//    @GetMapping("/feeds/{feed_id}/temp")
//    public ResponseEntity<?> getUpdateFeedInfo(@PathVariable Long feed_id){
//        return ResponseEntity.ok(feedService.getUpdateFeedInfo(feed_id));
//    }

    @ApiOperation(value = "피드 수정(실행)", notes = "피드 수정(실행)")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 수정에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버 에러입니다.")
    })
    @PutMapping("/feeds/{feed_id}")
    public ResponseEntity<?> updateFeed(@PathVariable("feed_id") Long feedId, @RequestBody FeedDto feedDto){
        return feedService.updateFeed(feedId,feedDto);
    }

    @ApiOperation(value = "피드 삭제", notes = "요청한 피드를 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "피드 삭제에 성공하였습니다."),
            @ApiResponse(code = 400, message = "요청한 피드가 없습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @DeleteMapping("/feeds/{feed_id}")
    public ResponseEntity<?> deleteFeed(@PathVariable("feed_id") Long feed_id){
        return feedService.deleteFeed(feed_id);
    }

    //=========================Comment=========================//

    @ApiOperation(value = "피드 댓글 작성", notes = "피드에 댓글을 작성하여 추가합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 피드에 성공적으로 댓글을 작성하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @PostMapping("/{feed_id}/comments/{user}")
    public ResponseEntity<?> postComment(@PathVariable("feed_id") Long feed_id, @RequestBody CommentDto commentDto,@PathVariable String user) {
        return feedService.postComment(feed_id, commentDto, user);
    }

    @ApiOperation(value = "피드 댓글 조회", notes = "피드에 등록된 댓글을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 피드의 댓글 조회에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @GetMapping("/{feed_id}/comments")
    public ResponseEntity<List<CommentListDto>> getComments(@PathVariable Long feed_id) {
        return ResponseEntity.ok(feedService.getComments(feed_id));
    }

    @ApiOperation(value = "피드 댓글 삭제", notes = "피드에 작성한 댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 댓글의 삭제에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @DeleteMapping("/{feed_id}/comments/{comment_id}")
    public ResponseEntity<?> deleteComment(@PathVariable("comment_id") Long comment_id) {
        return feedService.deleteComment(comment_id);
    }
}
