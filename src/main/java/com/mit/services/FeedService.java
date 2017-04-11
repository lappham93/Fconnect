package com.mit.services;

import org.springframework.stereotype.Service;

import com.mit.bodies.PostFeedBody;
import com.mit.responses.ListFeedResponse;

@Service
public class FeedService {
	
	public ListFeedResponse getFeedList(int page, int count) {
		return null;
	}
	
	public int postFeed(PostFeedBody body) {
		return 0;
	}
}
