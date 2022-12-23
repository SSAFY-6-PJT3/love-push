package com.cupid.joalarm.feed;

import com.cupid.joalarm.feed.childcomment.ChildComment;
import com.cupid.joalarm.feed.childcomment.ChildCommentDto;
import com.cupid.joalarm.feed.childcomment.ChildCommentListDto;
import com.cupid.joalarm.feed.childcomment.ChildCommentRepository;

import com.cupid.joalarm.feed.comment.*;
import com.cupid.joalarm.school.School;
import com.cupid.joalarm.school.SchoolRepository;


import com.cupid.joalarm.util.SecurityUtil;
import com.cupid.joalarm.feed.media.GlobalConfig;
import com.cupid.joalarm.feed.like.Like;
import com.cupid.joalarm.feed.like.LikeRepository;
import com.cupid.joalarm.feed.tag.Tag;
import com.cupid.joalarm.feed.tag.TagDto;
import com.cupid.joalarm.feed.tag.TagRepository;
import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.account.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
public class FeedService {

    public FeedRepository feedRepository;
    public AccountRepository accountRepository;
    public CommentRepository commentRepository;
    private GlobalConfig config;
    public TagRepository tagRepository;
    public LikeRepository likeRepository;
    public SecurityUtil securityUtil;
    public ChildCommentRepository childCommentRepository;
    public SchoolRepository schoolRepository;

    @Autowired
    public FeedService(FeedRepository feedRepository, AccountRepository accountRepository, CommentRepository commentRepository, GlobalConfig config, TagRepository tagRepository, LikeRepository likeRepository, SecurityUtil securityUtil, ChildCommentRepository childCommentRepository, SchoolRepository schoolRepository) {
        this.feedRepository = feedRepository;
        this.accountRepository = accountRepository;
        this.commentRepository = commentRepository;
        this.config = config;
        this.tagRepository = tagRepository;
        this.likeRepository = likeRepository;
        this.securityUtil = securityUtil;
        this.childCommentRepository = childCommentRepository;
        this.schoolRepository = schoolRepository;
    }

    @Transactional
    public ResponseEntity<?> postFeed(String user, FeedDto feedDto, TagDto tagDto){

//        MultipartFile multipartFile = feedDto.getMedia();

        // 파일 없음 || 파일이 비어있음
//        if (!(multipartFile == null || multipartFile.isEmpty())){
//            // 현재 날짜 폴더만들어서 저장
//            String currentDate = new SimpleDateFormat("yyyyMMdd").format(Calendar.getInstance().getTime());
//            String uploadFilePath = config.getUploadFilePath()+currentDate+"/";
//
//            // 랜덤이름 + . 확장자 가져오기
//            String postfix = multipartFile.getOriginalFilename().substring(multipartFile.getOriginalFilename().lastIndexOf(".")+1, multipartFile.getOriginalFilename().length());
//            String filename = UUID.randomUUID().toString() + "." + postfix;
//
//            // 폴더 없으면 만들기
//            File folder = new File(uploadFilePath);
//            if(!folder.isDirectory()){
//                folder.mkdirs();
//            }
//
//            String pathname = uploadFilePath+filename;
//            String resourcePathname = config.getUploadResourcePath()+currentDate+"/"+filename;
//
//            // url 경로 출력
//            System.out.println("resourcePathname = " + resourcePathname);
//
//            // 새로 파일 만들기
//            File dest = new File(pathname);
//            try {
//                multipartFile.transferTo(dest);
//            } catch (IOException e) {
//                e.printStackTrace();
//            }
//        }

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Tag
//        List<Tag> resTags = new ArrayList<>();
//
//
//        if (tagDto != null) {
//            for (String tempName : tagDto.getTagList()) {
//                Tag tempTag = tagRepository.findByName(tempName);
//                if (tempTag != null) {
//                    resTags.add(tempTag);
//                } else {
//                    Tag newTag = Tag.builder()
//                            .name(tempName)
//                            .build();
//                    tagRepository.save(newTag);
//                    resTags.add(newTag);
//                }
//            }
//        }

        // Create Feed
        Feed feed = Feed.builder()
                .content(feedDto.getContent())
                .likeCnt(0L)
//                .mediaUrl(resourcePathname)
                .account(account)
                .school(schoolRepository.findByName(feedDto.getSchool()))
//                .tags(resTags)
                .build();

        System.out.println("feed = " + feed);
        feedRepository.save(feed);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public List<FeedDto> getAllFeeds(String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        List<FeedDto> result = new ArrayList<>();

        for (Feed feed : feedRepository.findAll()) {

            FeedDto feedDto = new FeedDto();

            feedDto.setFeedId(feed.getFeedId());
            feedDto.setContent(feed.getContent());
            feedDto.setMediaUrl(feed.getMediaUrl());
            feedDto.setLikeCnt(feed.getLikeCnt());
            feedDto.setUsername(feed.getAccount().getId());
            feedDto.setCreatedAt(feed.getCreatedAt());
            feedDto.setUpdatedAt(feed.getUpdatedAt());
            feedDto.setSchool(feed.getSchool().getName());
            feedDto.setUserId(feed.getAccount().getAccountSeq());

            Long commentsCount = commentRepository.findByFeed(feed).stream().count();
            feedDto.setCommentsCount(commentsCount);

            System.out.println("feedDto = " + feedDto);

            // Check like_status
            Like like_flag = likeRepository.findByAccountAndFeed(account, feed);
            if (like_flag != null) {
                feedDto.setLikeStatus(true);
            } else {
                feedDto.setLikeStatus(false);
            }


            result.add(feedDto);
        }

        // Sorting By Created time
        result.sort(new Comparator<FeedDto>() {
            @Override
            public int compare(FeedDto o1, FeedDto o2) {
                return o2.getFeedId().intValue() - o1.getFeedId().intValue();
            }
        });

        return result;
    }

    public List<FeedDto> getSchoolFeeds(String school, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        List<FeedDto> result = new ArrayList<>();

        System.out.println(schoolRepository.findByName(school));
        School desireSchool = schoolRepository.findByName(school);

        for (Feed feed : feedRepository.findAll()) {

            if (!desireSchool.getSchoolId().equals(feed.getSchool().getSchoolId())) {
                continue;
            }
            FeedDto feedDto = new FeedDto();

            feedDto.setFeedId(feed.getFeedId());
            feedDto.setContent(feed.getContent());
            feedDto.setMediaUrl(feed.getMediaUrl());
            feedDto.setLikeCnt(feed.getLikeCnt());
            feedDto.setUsername(feed.getAccount().getId());
            feedDto.setCreatedAt(feed.getCreatedAt());
            feedDto.setUpdatedAt(feed.getUpdatedAt());
            feedDto.setSchool(feed.getSchool().getName());
            feedDto.setUserId(feed.getAccount().getAccountSeq());

            Long commentsCount = commentRepository.findByFeed(feed).stream().count();
            feedDto.setCommentsCount(commentsCount);

            System.out.println("feedDto = " + feedDto);

            // Check like_status
            Like like_flag = likeRepository.findByAccountAndFeed(account, feed);
            if (like_flag != null) {
                feedDto.setLikeStatus(true);
            } else {
                feedDto.setLikeStatus(false);
            }


            result.add(feedDto);
        }

        // Sorting By Created time
        result.sort(new Comparator<FeedDto>() {
            @Override
            public int compare(FeedDto o1, FeedDto o2) {
                return o2.getFeedId().intValue() - o1.getFeedId().intValue();
            }
        });

        return result;
    }

    @Transactional
    public FeedListDto getFeed(Long feedId, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Feed
        Optional<Feed> optFeed = feedRepository.findById(feedId);
        if (!optFeed.isPresent()) {
            return null;
        }
        Feed feed = optFeed.get();

        FeedListDto result = new FeedListDto();

        result.setFeedId(feed.getFeedId());
        result.setContent(feed.getContent());
        result.setMediaUrl(feed.getMediaUrl());
        result.setLikeCnt(feed.getLikeCnt());
        result.setUsername(feed.getAccount().getId());
        result.setCreatedAt(feed.getCreatedAt());
        result.setUpdatedAt(feed.getUpdatedAt());
        result.setSchool(feed.getSchool().getName());
        result.setUserId(feed.getAccount().getAccountSeq());

        int size = feed.getComments().size();
        long longSize = size;
        result.setCommentCnt(longSize);
        
        // Check like_status
        Like like_flag = likeRepository.findByAccountAndFeed(account, feed);
        if (like_flag != null) {
            result.setLikeStatus(true);
        } else {
            result.setLikeStatus(false);
        }

        // Get All comments
        List<AllCommentDto> tempAllCommentDtos = new ArrayList<>();

        for (Comment comment : feed.getComments()) {

            AllCommentDto allCommentDto = new AllCommentDto();

            allCommentDto.setCommentId(comment.getCommentId());
            allCommentDto.setCreatedAt(comment.getCreatedAt());
            allCommentDto.setUserId(comment.getAccount().getAccountSeq());
            allCommentDto.setContent(comment.getContent());
            allCommentDto.setLikeCnt(comment.getLikeCnt());

            tempAllCommentDtos.add(allCommentDto);

            List<ChildCommentDto> tempChildCommentDtos = new ArrayList<>();
            for (ChildComment childComment : comment.getChildComments()) {

                ChildCommentDto childCommentDto = new ChildCommentDto();

                childCommentDto.setChildId(childComment.getChildId());
                childCommentDto.setCreatedAt(childComment.getCreatedAt());
                childCommentDto.setUserId(childComment.getAccount().getAccountSeq());
                childCommentDto.setContent(childComment.getContent());
                childCommentDto.setCommentId(childComment.getComment().getCommentId());
                childCommentDto.setLikeCnt(childComment.getLikeCnt());

                tempChildCommentDtos.add(childCommentDto);
            }
            allCommentDto.setChildCommentDto(tempChildCommentDtos);
        }

        result.setAllComments(tempAllCommentDtos);
        return result;
    }

    public List<FeedDto> getProfileFeeds(String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        List<FeedDto> result = new ArrayList<>();
        for (Feed feed : feedRepository.findByAccount(account)) {
            FeedDto feedDto = new FeedDto();

            feedDto.setFeedId(feed.getFeedId());
            feedDto.setContent(feed.getContent());
            feedDto.setMediaUrl(feed.getMediaUrl());
            feedDto.setLikeCnt(feed.getLikeCnt());
            feedDto.setUsername(feed.getAccount().getId());
            feedDto.setSchool(feed.getSchool().getName());

            List<String> tempTags = new ArrayList<>();
//            for (Tag tag : feed.getTags()) {
//                tempTags.add(tag.getName());
//            };
//            feedDto.setTags(tempTags);

            // Check like_status
            Like like_flag = likeRepository.findByAccountAndFeed(account, feed);
            if (like_flag != null) {
                feedDto.setLikeStatus(true);
            } else {
                feedDto.setLikeStatus(false);
            }

            result.add(feedDto);
        }

        // Sorting By Created time
        result.sort(new Comparator<FeedDto>() {
            @Override
            public int compare(FeedDto o1, FeedDto o2) {
                return o2.getFeedId().intValue() - o1.getFeedId().intValue();
            }
        });
        return result;
    }

    public List<FeedListDto> getSearchFeeds(String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        List<FeedListDto> result = new ArrayList<>();

        List<Feed> allFeed = feedRepository.findAll();

        for (Feed feed : allFeed) {
            FeedListDto feedListDto = new FeedListDto();

            feedListDto.setFeedId(feed.getFeedId());
            feedListDto.setUsername(feed.getAccount().getId());
            feedListDto.setMediaUrl(feed.getMediaUrl());
            feedListDto.setLikeCnt(feed.getLikeCnt());
            feedListDto.setContent(feed.getContent());
            feedListDto.setSchool(feed.getSchool().getName());

            List<String> tempTags = new ArrayList<>();
            for (Tag tag : feed.getTags()) {
                tempTags.add(tag.getName());
            };
            feedListDto.setTags(tempTags);

            feedListDto.setCreatedAt(feed.getCreatedAt());
            feedListDto.setUpdatedAt(feed.getUpdatedAt());

            // Check like_status
            Like like_flag = likeRepository.findByAccountAndFeed(account, feed);
            if (like_flag != null) {
                feedListDto.setLikeStatus(true);
            } else {
                feedListDto.setLikeStatus(false);
            }

            result.add(feedListDto);
        }

        // Sorting By Created time
        result.sort(new Comparator<FeedListDto>() {
            @Override
            public int compare(FeedListDto o1, FeedListDto o2) {
                return o2.getFeedId().intValue() - o1.getFeedId().intValue();
            }
        });

        return result;
    }

    public List<FeedProfileDto> getProfileFeeds_temp(String email, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        List<Feed> feeds = feedRepository.findByAccount(account);
        List<FeedProfileDto> result= new ArrayList<>();

        for (Feed feed : feeds) {
            FeedProfileDto feedProfileDto = new FeedProfileDto();

            feedProfileDto.setFeedId(feed.getFeedId());
            feedProfileDto.setMediaUrl(feed.getMediaUrl());
            feedProfileDto.setLikeCnt(feed.getLikeCnt());
            feedProfileDto.setContent(feed.getContent());
            feedProfileDto.setEmail(feed.getAccount().getId());

            List<String> tempTags = new ArrayList<>();
            for (Tag tag : feed.getTags()) {
                tempTags.add(tag.getName());
            };
            feedProfileDto.setTags(tempTags);

            feedProfileDto.setCreatedAt(feed.getCreatedAt());
            feedProfileDto.setUpdatedAt(feed.getUpdatedAt());

            // Check like_status
            Like like_flag = likeRepository.findByAccountAndFeed(account, feed);
            if (like_flag != null) {
                feedProfileDto.setLikeStatus(true);
            } else {
                feedProfileDto.setLikeStatus(false);
            }

            result.add(feedProfileDto);
        }

        // Sorting By Created time
        result.sort(new Comparator<FeedProfileDto>() {
            @Override
            public int compare(FeedProfileDto o1, FeedProfileDto o2) {
                return o2.getFeedId().intValue() - o1.getFeedId().intValue();
            }
        });
        return result;
    }

    public FeedDto getUpdateFeedInfo(Long feed_id) {

        // Get Feed
        Optional<Feed> optFeed = feedRepository.findById(feed_id);
        if (!optFeed.isPresent()) {
            return null;
        }
        Feed feed = optFeed.get();

        FeedDto feedDto = new FeedDto();

        feedDto.setFeedId(feed.getFeedId());
        feedDto.setContent(feed.getContent());
        feedDto.setCreatedAt(feed.getCreatedAt());
        feedDto.setUpdatedAt(feed.getUpdatedAt());
        feedDto.setMediaUrl(feed.getMediaUrl());
        feedDto.setUsername(feed.getAccount().getId());

        List<String> tempTags = new ArrayList<>();
        for (Tag tag : feed.getTags()) {
            tempTags.add(tag.getName());
        };
        feedDto.setTags(tempTags);

        return feedDto;
    }

    @Transactional
    public ResponseEntity<?> updateFeed(Long feedId, FeedDto feedDto) {

        // Get Feed
        Optional<Feed> optFeed = feedRepository.findById(feedId);
        if (!optFeed.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Feed feed = optFeed.get();

        List<Tag> resTags = new ArrayList<>();

//        for (String tempName : feedDto.getTags()) {
//            Tag tempTag = tagRepository.findByName(tempName);
//            if (tempTag != null) {
//                resTags.add(tempTag);
//            } else {
//                Tag newTag = Tag.builder()
//                        .name(tempName)
//                        .build();
//                tagRepository.save(newTag);
//                resTags.add(newTag);
//            }
//        }

        // Update Feed
        if (feedDto.getContent()!=null) {
            feed.setContent(feedDto.getContent());
        }

        if (feedDto.getMediaUrl()!=null) {
            feed.setMediaUrl(feedDto.getMediaUrl());
        }

//        feed.setTags(resTags);
        feedRepository.save(feed);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> deleteFeed(Long feed_id) {

        // Get Feed
        Optional<Feed> feed = feedRepository.findById(feed_id);
        if (!feed.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Check Existence
        if (!feed.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            feedRepository.delete(feed.get());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    //=========================Comment=========================//

    public List<CommentListDto> getComments(Long feed_id) {

        // Get Feed
        Optional<Feed> feed = feedRepository.findById(feed_id);
        if (!feed.isPresent()) {
            return null;
        }
        List<CommentListDto> result = new ArrayList<>();

        for (Comment comment : commentRepository.findByFeed(feed.get())) {
            CommentListDto commentListDto = new CommentListDto();

            commentListDto.setCommentId(comment.getCommentId());
            commentListDto.setUserId(comment.getAccount().getAccountSeq());
            commentListDto.setContent(comment.getContent());
            commentListDto.setCreatedAt(comment.getCreatedAt());

            result.add(commentListDto);
        }

        return result;
    }

    @Transactional
    public ResponseEntity<?> postComment(Long feed_id, CommentDto commentDto, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Feed
        Optional<Feed> feed = feedRepository.findById(feed_id);
        if (!feed.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Build & Save Comment
        Comment comment = Comment.builder()
                .content(commentDto.getContent())
                .feed(feed.get())
                .account(account)
                .likeCnt(0L)
                .build();

        commentRepository.save(comment);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> deleteComment(Long comment_id) {

        commentRepository.deleteById(comment_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    //=========================ChildComment=========================//

    public List<ChildCommentListDto> getChildComments(Long comment_id) {

        // Get Comment
        Optional<Comment> comment = commentRepository.findById(comment_id);
        if (!comment.isPresent()) {
            return null;
        }
        List<ChildCommentListDto> result = new ArrayList<>();

        for (ChildComment childComment : childCommentRepository.findByComment(comment.get())) {
            ChildCommentListDto childCommentListDto = new ChildCommentListDto();

            childCommentListDto.setChildId(childComment.getChildId());
            childCommentListDto.setUserId(childComment.getAccount().getAccountSeq());
            childCommentListDto.setContent(childComment.getContent());
            childCommentListDto.setCreatedAt(childComment.getCreatedAt());
            childCommentListDto.setCommentId(childComment.getComment().getCommentId());

            result.add(childCommentListDto);
        }

        return result;
    }

    public ChildCommentDto getChildComment(Long comment_id, Long childId) {

        // Get Comment
        Optional<ChildComment> childCommentOpt = childCommentRepository.findById(childId);
        ChildComment childComment = childCommentOpt.get();

        ChildCommentDto childCommentDto = new ChildCommentDto();

        childCommentDto.setChildId(childComment.getChildId());
        childCommentDto.setUserId(childComment.getAccount().getAccountSeq());
        childCommentDto.setContent(childComment.getContent());
        childCommentDto.setCreatedAt(childComment.getCreatedAt());
        childCommentDto.setCommentId(childComment.getComment().getCommentId());

        return childCommentDto;
    }

    @Transactional
    public ResponseEntity<?> postChildComment(Long comment_id, ChildCommentDto childCommentDto, String user) {

        // Get User
        Long seq = Long.parseLong(user);
        Optional<Account> accountOpt = accountRepository.findById(seq);
        Account account = accountOpt.get();

        // Get Comment
        Optional<Comment> comment = commentRepository.findById(comment_id);
        if (!comment.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // Build & Save Comment
        ChildComment childComment = ChildComment.builder()
                .content(childCommentDto.getContent())
                .likeCnt(0L)
                .comment(comment.get())
                .account(account)
                .build();

        childCommentRepository.save(childComment);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Transactional
    public ResponseEntity<?> deleteChildComment(Long child_comment_id) {

        childCommentRepository.deleteById(child_comment_id);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
