package com.cupid.joalarm.feed.comment;

import com.cupid.joalarm.feed.childcomment.ChildCommentListDto;
import java.util.List;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class AllCommentsDto extends CommentListDto {

    List<ChildCommentListDto> childComments;
}
