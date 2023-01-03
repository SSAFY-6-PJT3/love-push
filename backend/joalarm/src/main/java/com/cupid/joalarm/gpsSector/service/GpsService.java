package com.cupid.joalarm.gpsSector.service;

import com.cupid.joalarm.gpsSector.dto.AccountInfoDto;
import com.cupid.joalarm.gpsSector.dto.PkEmojiPairDTO;
import com.cupid.joalarm.gpsSector.repository.GpsRepository;
import com.cupid.joalarm.gpsSector.scheduler.GpsDataSendScheduler;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;

@Service
@RequiredArgsConstructor

public class GpsService {

    private final GpsRepository gpsRepository;

    public void changeUserSector(String beforeGpsKey, String nowGpsKey, String sessionId) {
        if (!"".equals(beforeGpsKey)) {
            gpsRepository.dropUser(beforeGpsKey, sessionId);
        }
        gpsRepository.putUserSector(nowGpsKey, sessionId);
    }

    public void changeUserEmoji(String gpsKey, String sessionId, String emojiUrl) {
        gpsRepository.changeUserEmoji(gpsKey, sessionId, emojiUrl);
    }

    public void putUserSector(String gpsKey, String sessionId) {
        gpsRepository.putUserSector(gpsKey, sessionId);
    }

    public void dropUser(String gpsKey, String sessionId) {
        gpsRepository.dropUser(gpsKey, sessionId);
    }
}
