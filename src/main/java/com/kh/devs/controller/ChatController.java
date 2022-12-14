package com.kh.devs.controller;

import com.kh.devs.dto.ChatRoom;
import com.kh.devs.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Slf4j
//@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {
    private final ChatService chatService;
    @PostMapping("/chat")
    public ResponseEntity<String> createRoom(@RequestBody String name) {
        ChatRoom room = chatService.createRoom(name);
        log.info(room.getRoomId());
        return new ResponseEntity<>(room.getRoomId(), HttpStatus.OK);
    }
}
