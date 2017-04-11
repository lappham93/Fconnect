package com.mit.responses;

import com.mit.enums.ApiError;

public class ApiResponse<T> {
	private int code;
	private T data;
	private String msg;

	public ApiResponse(int code) {
		super();
		this.code = code;
	}
	
	public ApiResponse(ApiError apiError) {
		super();
		this.code = apiError.getValue();
		this.msg = apiError.getName();
	}
	
	public ApiResponse(int code, T data) {
		super();
		this.code = code;
		this.data = data;
	}
	
	public ApiResponse(T data) {
		super();
		this.data = data;
	}
	
	public ApiResponse(int code, T data, String msg) {
		super();
		this.code = code;
		this.data = data;
		this.msg = msg;
	}

	public int getCode() {
		return code;
	}

	public void setCode(int code) {
		this.code = code;
	}

	public T getData() {
		return data;
	}

	public void setData(T data) {
		this.data = data;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
