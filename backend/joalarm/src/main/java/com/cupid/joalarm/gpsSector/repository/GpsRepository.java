package com.cupid.joalarm.gpsSector.repository;

import com.cupid.joalarm.gpsSector.dto.AccountInfoDto;
import java.util.HashMap;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class GpsRepository {

    private static final HashMap<String, HashMap<String, AccountInfoDto>> GpsSectorHashMap = new HashMap<>();
    private boolean isOperationCommand = false;

    public void changeUserSector(String beforeGpsKey, String nowGpsKey, String sessionId) {
        GpsSectorHashMap.get(beforeGpsKey).remove(sessionId);
        putUserSector(nowGpsKey, sessionId);
        setOnOperationCommand();
    }

    public void putUserSector(String gpsKey, String sessionId) {
        AccountInfoDto info = (AccountInfoDto) SimpAttributesContextHolder.currentAttributes()
                .getAttribute("INFO");

        if (GpsSectorHashMap.containsKey(gpsKey)) {
            GpsSectorHashMap.get(gpsKey).put(sessionId, info);
        } else {
            GpsSectorHashMap.put(gpsKey, new HashMap<>() {{
                put(sessionId, info);
            }});
        }
        setOnOperationCommand();
    }

    public void dropUser(String gpsKey, String sessionId) {
        GpsSectorHashMap.get(gpsKey).remove(sessionId);
        setOnOperationCommand();
    }

    public HashMap<String, HashMap<String, AccountInfoDto>> getAllGpsSectorData() {
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
