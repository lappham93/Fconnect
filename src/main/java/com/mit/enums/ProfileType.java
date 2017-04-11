package com.mit.enums;

public enum ProfileType {
	UNKNOW(0), NORMAL(1), VIP(2);
	
	private int value;
	
	private ProfileType(int value) {
		this.value = value;
	}
	
	public int getValue() {
		return value;
	}
}
