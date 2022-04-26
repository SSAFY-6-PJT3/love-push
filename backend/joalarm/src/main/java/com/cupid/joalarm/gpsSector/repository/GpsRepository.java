package com.cupid.joalarm.gpsSector.repository;

import com.cupid.joalarm.gpsSector.dto.PkEmojiPairDTO;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;

@Repository
public class GpsRepository {
    private HashMap<String, HashMap<String, PkEmojiPairDTO>> GpsSectorHashMap;

    @PostConstruct
    private void init() {GpsSectorHashMap = new HashMap<>();}

    public HashMap<String, HashMap<String, PkEmojiPairDTO>> getAllGpsSectorData() {
        return GpsSectorHashMap;
    }

    public void changeUserSector(String beforeGpsKey, String nowGpsKey, String sessionId) {
        GpsSectorHashMap.get(nowGpsKey).put(sessionId, GpsSectorHashMap.get(beforeGpsKey).get(sessionId));
        GpsSectorHashMap.get(beforeGpsKey).remove(sessionId);
    }

    public void changeUserEmoji(String gpsKey, String sessionId, String emojiUrl) {
        PkEmojiPairDTO pkEmojiPairDTO = GpsSectorHashMap.get(gpsKey).get(sessionId);
        pkEmojiPairDTO.setEmojiURL(emojiUrl);
        GpsSectorHashMap.get(gpsKey).put(sessionId, pkEmojiPairDTO);
    }

    public void putUserSector(String gpsKey, String sessionId, PkEmojiPairDTO pkEmojiPairDTO) {
        // get now가 있으면 넣고, 없으면 생성 후 넣기
        if (GpsSectorHashMap.containsKey(gpsKey)) {
            GpsSectorHashMap.get(gpsKey).put(sessionId, pkEmojiPairDTO);
        } else {
            GpsSectorHashMap
                    .put(gpsKey, new HashMap<>(){
                        {put(sessionId, pkEmojiPairDTO);}
                    });
        }
    }

    public void dropUser(String gpsKey, String sessionId) {
        GpsSectorHashMap.get(gpsKey).remove(sessionId);
    }
}
