package com.mit.exceptions;

/**
 * Created by Hung Le on 2/15/17.
 */
public class UnsupportSocialTypeException extends Exception {
    public UnsupportSocialTypeException() {
    }

    public UnsupportSocialTypeException(String message) {
        super(message);
    }
}
