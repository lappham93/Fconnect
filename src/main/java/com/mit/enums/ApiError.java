package com.mit.enums;

public enum ApiError {
	SUCCESS(1, "Success"), 
	POST_FEED_ERROR(-101, "Post Feed Error"),
	
	SERVER_ERROR(-1, "Server Error");
	
	private int value;
	private String name;
	
	private ApiError(int value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public int getValue() {
		return value;
	}
	
	public String getName() {
		return name;
	}
}
