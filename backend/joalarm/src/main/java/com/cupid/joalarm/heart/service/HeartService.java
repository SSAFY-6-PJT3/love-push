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
    public void SendHeart(long sendUser, long receiveUser) {
        if (sendUser != 0) {
            HeartEntity heartEntity = HeartEntity.builder().sendUser(sendUser).receiveUser(receiveUser).build();
            heartRepository.save(heartEntity);
        }
        messageTemplate.convertAndSend("/sub/user/" + receiveUser, new HeartTypeDTO("HEART", sendUser));
    }

    public List<HeartEntity> SendHeartList(long user) {
        return heartRepository.findAllBySendUser(user);
    }
}
