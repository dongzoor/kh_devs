package com.kh.devs.exception;

public class NotFoundUserException extends RuntimeException {
    public NotFoundUserException(String msg) {
        super(msg);
    }
}
