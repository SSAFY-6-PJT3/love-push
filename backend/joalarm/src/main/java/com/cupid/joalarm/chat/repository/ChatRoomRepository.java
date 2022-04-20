package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.DTO.ChatRoom;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {  // 추후 DB나 다른 저장 매체에 채팅창 정보 저장하도록 구현할 것
    private Map<String, ChatRoom> chatRoomMap;

    @PostConstruct  // 의존성 주입 이루어진 후 초기화 수행, 빈 초기화와 동시에 의존성 확인
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public List<ChatRoom> findAllRoom() {
        List chatRooms = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }

    public ChatRoom findRoomById(String id) {
        return chatRoomMap.get(id);
    }

    public static ChatRoom createChatRoom(String name) {
        ChatRoom chatRoom = ChatRoom.create(name);
//        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
        return chatRoom;
    }
}
