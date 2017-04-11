package com.mit.repositories;

import org.springframework.stereotype.Repository;

import com.mit.entities.Feed;

@Repository
public class FeedRepo extends ActiveTimeDocRepo<Feed>{

	public FeedRepo(Class<Feed> classType) {
		super(classType);
	}
	
}
