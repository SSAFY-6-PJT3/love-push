package com.cupid.joalarm.gpsSector.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import com.cupid.joalarm.gpsSector.dto.PkEmojiPairDTO;

import javax.annotation.PostConstruct;
import java.util.HashMap;

@Repository
@RequiredArgsConstructor
public class GpsRepository {
    private HashMap<String, HashMap<String, PkEmojiPairDTO>> GpsSectorHashMap;
    private boolean isOperationCommand = false;

    @PostConstruct
    private void init() {GpsSectorHashMap = new HashMap<>();}

    public void changeUserSector(String beforeGpsKey, String nowGpsKey, String sessionId) {
        PkEmojiPairDTO beforePair = GpsSectorHashMap.get(beforeGpsKey).get(sessionId);
        GpsSectorHashMap.get(beforeGpsKey).remove(sessionId);
        putUserSector(nowGpsKey, sessionId, beforePair);
        setOnOperationCommand();
    }

    public void changeUserEmoji(String gpsKey, String sessionId, String emojiUrl) {
        com.cupid.joalarm.gpsSector.dto.PkEmojiPairDTO pkEmojiPairDTO = GpsSectorHashMap.get(gpsKey).get(sessionId);
        pkEmojiPairDTO.setEmojiURL(emojiUrl);
        GpsSectorHashMap.get(gpsKey).put(sessionId, pkEmojiPairDTO);
        setOnOperationCommand();
    }

    public void putUserSector(String gpsKey, String sessionId, PkEmojiPairDTO pkEmojiPairDTO) {
        // get now가 있으면 넣고, 없으면 생성 후 넣기
        if (GpsSectorHashMap.containsKey(gpsKey)) {
            GpsSectorHashMap.get(gpsKey).put(sessionId, pkEmojiPairDTO);
        } else {
            GpsSectorHashMap
                    .put(gpsKey, new HashMap<>() {
                        {
                            put(sessionId, pkEmojiPairDTO);
                        }
                    });
        }
        setOnOperationCommand();
    }

    public void dropUser(String gpsKey, String sessionId) {
        GpsSectorHashMap.get(gpsKey).remove(sessionId);
        setOnOperationCommand();
    }

    public HashMap<String, HashMap<String, PkEmojiPairDTO>> getAllGpsSectorData() {
        return GpsSectorHashMap;
    }

    private void setOnOperationCommand() {
        isOperationCommand = true;
    }

    public void setOffOperationCommand() {
        isOperationCommand = false;
    }

    public boolean getOperationCommand() {
        return isOperationCommand;
    }
}
