package com.mit.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.mit.bodies.LoginBody;
import com.mit.bodies.ProfileBody;
import com.mit.bodies.RegisterBody;
import com.mit.responses.ApiResponse;
import com.mit.responses.ProfileResponse;
import com.mit.services.UserService;

import io.swagger.annotations.ApiModel;

@ApiModel
@RestController
@RequestMapping(value = "/api/user")
public class UserController {
	@Autowired
	private UserService userService;

	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public ApiResponse<ProfileResponse> register(HttpServletRequest request, @RequestBody RegisterBody body) {
		return new ApiResponse<>(userService.register(body));
	}

	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public ApiResponse<ProfileResponse> login(HttpServletRequest request, @RequestBody LoginBody body) {
		return new ApiResponse<>(userService.login(body));
	}

	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public ApiResponse<Object> logout(HttpServletRequest request) {
		userService.logout("");
		return null;
	}

	@RequestMapping(value = "/profile", method = RequestMethod.PUT)
	public ApiResponse<ProfileResponse> updateProfile(HttpServletRequest request, @RequestBody ProfileBody body) {
		return new ApiResponse<>(userService.updateProfile(body));
	}
}
