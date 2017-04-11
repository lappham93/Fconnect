package com.mit.exceptions;

/**
 * Created by Hung Le on 2/13/17.
 */
public class TokenInvalidException extends Exception {

    public TokenInvalidException() {
    }

    public TokenInvalidException(String message) {
        super(message);
    }
}
