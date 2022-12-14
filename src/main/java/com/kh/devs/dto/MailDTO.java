package com.kh.devs.dto;

public class MailDTO {
    private String sender;
    private String content;
    private String title;


    @Override
    public String toString() {
        return "Mail [sender=" + sender + ", content=" + content + ", title=" + title + "]";
    }


    public String getSender() {
        return sender;
    }


    public void setSender(String sender) {
        this.sender = sender;
    }


    public String getContent() {
        return content;
    }


    public void setContent(String content) {
        this.content = content;
    }


    public String getTitle() {
        return title;
    }


    public void setTitle(String title) {
        this.title = title;
    }
}
