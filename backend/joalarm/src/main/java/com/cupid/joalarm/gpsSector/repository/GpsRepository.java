package com.cupid.joalarm.gpsSector.repository;

import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.HashMap;

@Repository
public class GpsRepository {
    private HashMap<String, HashMap<Integer, String>> GpsSectorHashMap;

    @PostConstruct
    private void init() {GpsSectorHashMap = new HashMap<>();}

    public HashMap<String, HashMap<Integer, String>> getAllGpsSectorData() {
        return GpsSectorHashMap;
    }

    public void changeUserSector(String beforeGpsKey, String nowGpsKey, int pk) {
        GpsSectorHashMap.get(nowGpsKey).put(pk, GpsSectorHashMap.get(beforeGpsKey).get(pk));
        GpsSectorHashMap.get(beforeGpsKey).remove(pk);
    }

    public void changeUserEmoji(String gpsKey, int pk, String emojiUrl) {
        GpsSectorHashMap.get(gpsKey).put(pk, emojiUrl);
    }

    public void putUserSector(String gpsKey, int pk, String emojiUrl) {
        // get now가 있으면 넣고, 없으면 생성 후 넣기
        if (GpsSectorHashMap.containsKey(gpsKey)) {
            GpsSectorHashMap.get(gpsKey).put(pk, emojiUrl);
        } else {
            GpsSectorHashMap
                    .put(gpsKey, new HashMap<>(){
                        {put(pk, emojiUrl);}
                    });
        }
    }
}
