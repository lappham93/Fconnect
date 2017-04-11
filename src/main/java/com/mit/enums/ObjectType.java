package com.mit.enums;

public enum ObjectType {
	UNKNOW(0, "unknow"), USER(1, "user"), FEED(2, "feed");
	
	private int value;
	private String name;
	
	private ObjectType(int value, String name) {
		this.value = value;
		this.name = name;
	}
	
	public int getValue() {
		return value;
	}
	
	public String getName() {
		return name;
	}
	
	public static ObjectType getType(int value) {
		for (ObjectType objectType : ObjectType.values()) {
			if (objectType.getValue() == value) {
				return objectType;
			}
		}
		
		return UNKNOW;
	}
}
