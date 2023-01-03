package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.chatroom.dto.CreateChatRoomDTO;
import com.cupid.joalarm.chatroom.service.ChatRoomService;
import com.cupid.joalarm.heart.dto.HeartDto;
import com.cupid.joalarm.heart.service.HeartService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("heart")
@Api(value = "heart 관련 기능")
public class HeartController {

    private final HeartService heartService;
    private final ChatRoomService chatRoomService;

    @ApiOperation(value = "하트를 받았을 때 호출합니다.", notes = "하트를 받으면 기록하고, 하트가 교환되었다면 채팅방을 생성합니다.")
    @PostMapping
    public void receiveHeart(HeartDto heartDto) {
        if (heartService.receiveHeart(heartDto) && !chatRoomService.findFirstByUserList(
                new long[] {heartDto.getSendAccountSeq(), heartDto.getSendAccountSeq()})) {
            chatRoomService.CreateChatRoom(
                    new CreateChatRoomDTO(heartDto.getSendAccountSeq(), heartDto.getReceiveAccountSeq()));
        }

    }

}