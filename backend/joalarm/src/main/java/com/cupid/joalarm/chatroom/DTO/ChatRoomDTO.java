package com.cupid.joalarm.chatroom.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatroomDTO {
    private Long userPk;
    private List<Long> chatroomList = new ArrayList<>();
}
