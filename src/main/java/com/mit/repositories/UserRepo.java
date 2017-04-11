package com.mit.repositories;

import org.springframework.stereotype.Repository;

import com.mit.entities.User;

@Repository
public class UserRepo extends ActiveTimeDocRepo<User>{

	public UserRepo(Class<User> classType) {
		super(classType);
	}
	
}
