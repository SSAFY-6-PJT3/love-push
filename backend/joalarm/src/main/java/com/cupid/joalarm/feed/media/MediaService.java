package com.cupid.joalarm.feed.media;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.UUID;

@Service
@AllArgsConstructor
@Slf4j
public class MediaService {

    private GlobalConfig config;


    public String save(MultipartFile file) {
        // 파일 저장 경로에서 현재 날짜로 된 폴더 내에 저장
        String today = new SimpleDateFormat("yyyyMMdd")
                .format(Calendar.getInstance().getTime());

        String uploadPath = config.getUploadPath() + today + "/";

        // 해당 저장 경로가 존재하지 않을 경우
        File folder = new File(uploadPath);
        if (!folder.isDirectory()) {
            if (!folder.mkdirs()) {
                System.out.println("[ERROR] Folder generation failed");
                return null;
            }
        }

        // 저장 파일명 생성
        String ogFilename = file.getOriginalFilename(); // original filename
        String ext = ogFilename.substring(ogFilename.lastIndexOf(".") + 1); // 확장자 추출
        String filename = UUID.randomUUID() + "." + ext;

        // 파일 저장
        File savedFile = new File(uploadPath + filename);
        try {
            file.transferTo(savedFile);
        }
        catch (IOException e) {
            log.error("IOException", e);
        }

        // 리소스 경로 생성
        return config.getResourcePath() + today + "/" + filename;
    }

}
