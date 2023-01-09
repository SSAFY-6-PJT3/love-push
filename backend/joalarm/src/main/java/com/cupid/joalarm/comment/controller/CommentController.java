package com.cupid.joalarm.comment.controller;

import com.cupid.joalarm.comment.dto.CommentDto;
import com.cupid.joalarm.comment.service.CommentService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api("댓글 관련 기능 접근 방법")
@RestController
@RequestMapping("/feed")
public class CommentController {

    private CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @ApiOperation(value = "피드 댓글 작성", notes = "피드에 댓글을 작성하여 추가합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 피드에 성공적으로 댓글을 작성하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @PostMapping("/{feedId}/comments/{userId}")
    public ResponseEntity<?> postComment(@PathVariable("feedId") Long feedId, @RequestBody CommentDto commentDto,@PathVariable String userId) {
        return commentService.postComment(feedId, commentDto, userId);
    }

    @ApiOperation(value = "피드 댓글 삭제", notes = "피드에 작성한 댓글을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "요청한 댓글의 삭제에 성공하였습니다."),
            @ApiResponse(code = 500, message = "서버에러가 발생했습니다.")
    })
    @DeleteMapping("/{feedId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(@PathVariable("commentId") Long commentId) {
        return commentService.deleteComment(commentId);
    }

}
