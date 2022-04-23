package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.DTO.ChatRoomDTO;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.util.*;

@Repository
public class ChatRoomRepository {  // 추후 DB나 다른 저장 매체에 채팅창 정보 저장하도록 구현할 것
    private Map<String, ChatRoomDTO> chatRoomMap;

    @PostConstruct  // 의존성 주입 이루어진 후 초기화 수행, 빈 초기화와 동시에 의존성 확인
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public List<ChatRoomDTO> findMyRooms() {  // 내 pk가 포함되어있는 채팅방 찾아서 반환하게끔 변경
        List chatRooms = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }

    public ChatRoomDTO findRoomById(String id) {
        return chatRoomMap.get(id);
    }

    public static ChatRoomDTO createChatRoom(String name) {
        ChatRoomDTO chatRoomDTO = ChatRoomDTO.create(name);
//        chatRoomMap.put(chatRoom.getRoomId(), chatRoom);
        return chatRoomDTO;
    }
}
