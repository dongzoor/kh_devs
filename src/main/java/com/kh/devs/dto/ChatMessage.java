package com.kh.devs.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ChatMessage { //구현부임,
    public enum MessageType {
        ENTER, TALK
    }
    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
}
