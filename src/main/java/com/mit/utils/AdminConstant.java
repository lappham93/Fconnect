package com.mit.utils;

public class AdminConstant {
	public static enum updateType {
		INFO(1), PHOTO(2);
		
		private int value;
		
		private updateType(int value) {
			this.value = value;
		}

		public int getValue() {
			return value;
		}

		public void setValue(int value) {
			this.value = value;
		}
		
	}
	
	public static final int errCode = -1;
	//response message
	public static final String loginErrMsg = "Invalid username or password";
	
	public static final String serverErrMsg = "Server Error";
	public static final String postSuccessMsg = "Add successfully";
	public static final String getSuccessMsg = "Get successfully";
	public static final String putSuccessMsg = "Edit successfully";
	public static final String deleteSuccessMsg = "Delete successfully";
	
	public static final String savePhotoErrMsg = "Can't save photo";
	public static final String uniqueErrMsg = "%s has already existed";
}
