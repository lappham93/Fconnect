package com.mit.repositories;

import org.springframework.stereotype.Repository;

import com.mit.entities.Admin;

@Repository
public class AdminRepo extends ActiveTimeDocRepo<Admin>{

	public AdminRepo(Class<Admin> classType) {
		super(classType);
	}
	
}
