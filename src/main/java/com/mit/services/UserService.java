package com.mit.services;

import org.springframework.stereotype.Service;

import com.mit.bodies.LoginBody;
import com.mit.bodies.ProfileBody;
import com.mit.bodies.RegisterBody;
import com.mit.responses.ProfileResponse;

@Service
public class UserService {
	
	public ProfileResponse register(RegisterBody body) {
		return null;
	}
	
	public ProfileResponse login(LoginBody body) {
		return null;
	}
	
	public int logout(String sessionKey) {
		return 0;
	}
	
	public ProfileResponse updateProfile(ProfileBody body) {
		return null;
	}
	
}
