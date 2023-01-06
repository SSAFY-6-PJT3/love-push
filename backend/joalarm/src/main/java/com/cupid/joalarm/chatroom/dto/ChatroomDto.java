package com.cupid.joalarm.chatroom.dto;

import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class ChatroomDto {
    private Long userPk;
    private List<Long> chatroomList = new ArrayList<>();

}
