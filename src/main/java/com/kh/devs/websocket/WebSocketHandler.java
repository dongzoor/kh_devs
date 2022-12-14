package com.kh.devs.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kh.devs.dto.ChatMessage;
import com.kh.devs.dto.ChatRoom;
import com.kh.devs.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@RequiredArgsConstructor
@Slf4j
@Component // 빈에다 등록한다 -> configuration이랑 뭔 차이 ?
public class WebSocketHandler extends TextWebSocketHandler {
    private final ObjectMapper objectMapper; // json 데이터를 ChatMessage Class로 변경해주는 역할
    private final ChatService chatService;
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.warn("{}", payload);
        ChatMessage chatMessage = objectMapper.readValue(payload, ChatMessage.class);
        ChatRoom chatRoom = chatService.findRoombyId(chatMessage.getRoomId());
        chatRoom.handleActions(session, chatMessage, chatService);
    }
}
