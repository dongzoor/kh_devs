package com.kh.devs.exception;

public class NotFoundStudyException extends RuntimeException {
    public NotFoundStudyException(String msg) {
        super(msg);
    }
}