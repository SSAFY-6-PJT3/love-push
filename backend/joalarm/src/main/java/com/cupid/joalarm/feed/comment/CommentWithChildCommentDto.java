package com.cupid.joalarm.feed.comment;

import com.cupid.joalarm.feed.childcomment.ChildCommentListDto;
import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CommentWithChildCommentDto {
    CommentListDto commentListDto;
    List<ChildCommentListDto> childComments;
}
