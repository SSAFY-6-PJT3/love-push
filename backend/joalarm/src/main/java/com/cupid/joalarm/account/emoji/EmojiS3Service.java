package com.cupid.joalarm.account.emoji;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectListing;
import com.amazonaws.services.s3.model.S3ObjectSummary;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EmojiS3Service {
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;
    @Value("${cloud.aws.region.static}")
    private String region;
    private String bucketUrl;

    @PostConstruct
    public void postConstruct() {
        this.bucketUrl = String.format("https://%s.s3.%s.amazonaws.com/",
                bucketName, region);
    }

    public List<String> getAllEmojis(EmojiDto emojiDto){
        String myEmoji = emojiDto==null? null: emojiDto.getEmojiUrl();
        boolean contains = false;
        List<String> emojiList = new ArrayList<>();
        ObjectListing objects = amazonS3Client.listObjects(bucketName);
        for (S3ObjectSummary objectSummary : objects.getObjectSummaries()) {
            String emoji = bucketUrl+objectSummary.getKey();
            if(myEmoji!=null&& myEmoji.equals(emoji)){
                contains=true;
                continue;
            }
            emojiList.add(bucketUrl+objectSummary.getKey());
        }
        if(contains)
            emojiList.add(0,myEmoji);


        return emojiList;
    }

}
