package com.cupid.joalarm.message;

import com.cupid.joalarm.accountChatroom.dto.AccountChatroomDto;
import com.cupid.joalarm.chat.dto.ChatDto;
import com.cupid.joalarm.love.dto.LoveDto;
import com.cupid.joalarm.notice.dto.NoticeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class Message {

    private final SimpMessageSendingOperations messageTemplate;

    public void createChatroom(long accountSeq, AccountChatroomDto accountChatroomDto) {
        messageTemplate.convertAndSend(String.format("/sub/chatroom/%d", accountSeq), accountChatroomDto);
    }

    public void chat(long accountSeq, ChatDto chatDto) {
        messageTemplate.convertAndSend(String.format("/sub/chat/%d", accountSeq), chatDto);
    }

    public void love(LoveDto loveDto) {
        messageTemplate.convertAndSend("/sub/love", loveDto);
    }

    public void notice(long accountSeq, NoticeDto noticeDto) {
        messageTemplate.convertAndSend(String.format("/sub/notice/%d", accountSeq), noticeDto);
    }

}
