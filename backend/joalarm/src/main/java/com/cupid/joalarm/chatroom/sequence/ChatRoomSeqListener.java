package com.cupid.joalarm.chatroom.sequence;

import com.cupid.joalarm.chatroom.entity.ChatRoomEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ChatRoomSeqListener extends AbstractMongoEventListener<ChatRoomEntity> {
    private final SequenceGeneratorService generatorService;

    @Override
    public void onBeforeConvert(BeforeConvertEvent<ChatRoomEntity> event) {
        if (event.getSource().getChatroomSeq() < 1) {
            event.getSource().setChatroomSeq(generatorService.generateSequence(ChatRoomEntity.SEQUENCE_NAME));
        }
    }
}
