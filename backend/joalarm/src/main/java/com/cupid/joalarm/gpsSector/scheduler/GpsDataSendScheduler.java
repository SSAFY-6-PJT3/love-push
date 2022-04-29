package com.cupid.joalarm.gpsSector.scheduler;


import com.cupid.joalarm.gpsSector.repository.GpsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GpsDataSendScheduler {
    private final SimpMessageSendingOperations messageTemplate;
    private final GpsRepository gpsRepository;

    @Scheduled(fixedRate = 5000)
    public void sendBasicChat() {  // basic으로 전체 채팅 보내기
        if (gpsRepository.getOperationCommand()) {
            messageTemplate.convertAndSend("/sub/basic", gpsRepository.getAllGpsSectorData());
            gpsRepository.setOffOperationCommand();
        }
    }
}
