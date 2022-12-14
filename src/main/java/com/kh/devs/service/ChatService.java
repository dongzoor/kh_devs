package com.kh.devs.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.devs.dto.ChatRoom;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Service
public class ChatService {
    private final ObjectMapper objectMapper;
    private Map<String, ChatRoom> chatRooms;
    @PostConstruct // 의존성 주입 이후에 초기화를 수행하는 메소드
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }
    public List<ChatRoom> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }
    public ChatRoom findRoombyId(String roomId) {
        return chatRooms.get(roomId);
    }
    public ChatRoom createRoom(String name) {
        String randomId = UUID.randomUUID().toString();
        log.info("UUID : " + randomId);
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(randomId)
                .name(name)
                .build();
        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
