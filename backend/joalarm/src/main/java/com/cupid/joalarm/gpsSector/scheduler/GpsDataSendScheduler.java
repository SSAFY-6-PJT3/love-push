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
    private boolean isOperationCommand = false;

    public void setOperationCommand() {
        isOperationCommand = true;
    }

    @Scheduled(fixedRate = 5000)
    public void sendBasicChat() {
        // basic으로 전체 채팅 보내기
//        System.out.println("isOperationCommand: " + isOperationCommand);
        if (isOperationCommand) {
            messageTemplate.convertAndSend("/sub/basic", gpsRepository.getAllGpsSectorData());
//            System.out.println("sendBasicMessage");
        }
        isOperationCommand = false;
    }
}
