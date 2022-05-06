package com.cupid.joalarm.heart.service;

import com.cupid.joalarm.heart.dto.HeartTypeDTO;
import com.cupid.joalarm.heart.entity.HeartEntity;
import com.cupid.joalarm.heart.repository.HeartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HeartService {
    private final HeartRepository heartRepository;
    private final SimpMessageSendingOperations messageTemplate;

    @Transactional
    public void logHeartUser(long sendUser, long[] receiveUsers) {
        if (sendUser != 0) {
            for (long receiveUser : receiveUsers) {
                HeartEntity heartEntity = HeartEntity.builder().sendUser(sendUser).receiveUser(receiveUser).build();
                heartRepository.save(heartEntity);
            }


        }
    }

    @Transactional
    public void sendHeart(long sendUser, String[] receiveSessions) {
        for (String session : receiveSessions) {
            messageTemplate.convertAndSend("/sub/heart/" + session, new HeartTypeDTO("HEART", sendUser));
        }
    }

    public List<HeartEntity> SendHeartList(long user) {
        return heartRepository.findAllBySendUser(user);
    }
}
