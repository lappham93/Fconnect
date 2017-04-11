package com.mit.repositories;

import org.springframework.stereotype.Repository;

import com.mit.entities.Profile;

@Repository
public class ProfileRepo extends ActiveTimeDocRepo<Profile>{

	public ProfileRepo(Class<Profile> classType) {
		super(classType);
	}
	
}
