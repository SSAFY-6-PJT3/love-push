package com.cupid.joalarm.chat.repository;

import com.cupid.joalarm.chat.dto.ChatRoomDTO;
import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.awt.*;
import java.util.*;
import java.util.List;

@Repository
public class ChatRoomRepository {  // 추후 DB나 다른 저장 매체에 채팅창 정보 저장하도록 구현할 것
    private static Map<Long, ChatRoomDTO> chatRoomMap;
    private static long pk = 1;

    @PostConstruct  // 의존성 주입 이루어진 후 초기화 수행, 빈 초기화와 동시에 의존성 확인
    private void init() {
        chatRoomMap = new LinkedHashMap<>();
    }

    public List<ChatRoomDTO> findMyRooms() {  // 내 pk가 포함되어있는 채팅방 찾아서 반환하게끔 변경
        List<ChatRoomDTO> chatRooms = new ArrayList<>(chatRoomMap.values());
        Collections.reverse(chatRooms);
        return chatRooms;
    }

    public ChatRoomDTO findRoomById(Long id) {
        return chatRoomMap.get(id);
    }

    public long createChatRoom(Point users) {
        ChatRoomDTO chatRoom = new ChatRoomDTO(pk, users);
        chatRoomMap.put(pk, chatRoom);
        return pk++;
    }
}
