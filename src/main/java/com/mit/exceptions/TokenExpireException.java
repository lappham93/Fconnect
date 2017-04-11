package com.mit.exceptions;

/**
 * Created by Hung Le on 2/13/17.
 */
public class TokenExpireException extends Exception {

    public TokenExpireException() {
    }

    public TokenExpireException(String message) {
        super(message);
    }
}
