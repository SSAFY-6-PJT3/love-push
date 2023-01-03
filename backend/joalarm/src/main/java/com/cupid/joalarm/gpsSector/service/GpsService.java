package com.cupid.joalarm.gpsSector.service;

import com.cupid.joalarm.gpsSector.repository.GpsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    public void putUserSector(String gpsKey, String sessionId) {
        gpsRepository.putUserSector(gpsKey, sessionId);
    }

    public void dropUser(String gpsKey, String sessionId) {
        gpsRepository.dropUser(gpsKey, sessionId);
    }
}
