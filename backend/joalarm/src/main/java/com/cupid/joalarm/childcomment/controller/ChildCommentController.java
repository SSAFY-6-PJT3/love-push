package com.cupid.joalarm.childcomment.controller;

import com.cupid.joalarm.childcomment.dto.ChildCommentDto;
import com.cupid.joalarm.childcomment.dto.ChildCommentListDto;
import com.cupid.joalarm.childcomment.service.ChildCommentService;
import com.cupid.joalarm.comment.dto.CommentDto;
import com.cupid.joalarm.comment.dto.CommentListDto;
import com.cupid.joalarm.feed.dto.FeedDto;
import com.cupid.joalarm.feed.dto.FeedListDto;
import com.cupid.joalarm.feed.service.FeedService;
import com.cupid.joalarm.feed.tag.TagDto;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api("대댓글 관련 기능 접근 방법")
@RestController
@RequestMapping("/feed")
public class ChildCommentController {

    private ChildCommentService childCommentService;

    @Autowired
    public ChildCommentController(ChildCommentService childCommentService) {
        this.childCommentService = childCommentService;
    }

    //=========================ChildComment=========================//

    @ApiOperation(value = "피드 대댓글 작성", notes = "댓글에 대대글을 작성하여 추가합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 댓글에 성공적으로 대댓글을 작성하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @PostMapping("/{commentId}/childcomments/{userId}")
    public ResponseEntity<?> postChildComment(@PathVariable("commentId") Long commentId, @RequestBody ChildCommentDto childCommentDto, @PathVariable String userId) {
        return childCommentService.postChildComment(commentId, childCommentDto, userId);
    }

    @ApiOperation(value = "댓글 대댓글 리스트 조회", notes = "댓글에 등록된 대댓글 리스트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 댓글의 대댓글 리스트 조회에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @GetMapping("/{commentId}/childcomments")
    public ResponseEntity<List<ChildCommentListDto>> getChildComments(@PathVariable Long commentId) {
        return ResponseEntity.ok(childCommentService.getChildComments(commentId));
    }

    @ApiOperation(value = "댓글 대댓글 조회", notes = "댓글에 등록된 대댓글을 조회합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 댓글의 대댓글 조회에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @GetMapping("/{commentId}/childcomments/{childId}")
    public ResponseEntity<ChildCommentDto> getChildComments(@PathVariable Long commentId, @PathVariable Long childId) {
        return ResponseEntity.ok(childCommentService.getChildComment(commentId, childId));
    }

    @ApiOperation(value = "댓글 대댓글 삭제", notes = "댓글에 작성한 대댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 대댓글의 삭제에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @DeleteMapping("/{commentId}/childcomments/{childId}")
    public ResponseEntity<?> deleteChildComment(@PathVariable("commentId") Long commentId, @PathVariable("childId") Long childId) {
        return childCommentService.deleteChildComment(childId);
    }
}