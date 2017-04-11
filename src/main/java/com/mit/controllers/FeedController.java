package com.mit.controllers;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mit.bodies.PostFeedBody;
import com.mit.enums.ApiError;
import com.mit.responses.ApiResponse;
import com.mit.responses.ListFeedResponse;
import com.mit.services.FeedService;

import io.swagger.annotations.ApiModel;

@ApiModel
@RestController
@RequestMapping(value = "/api/feed")
public class FeedController {
	private final int PAGE_DEFAULT = 1;
	private final int COUNT_DEFAULT = 20;
	@Autowired
	private FeedService feedService;
	
	@RequestMapping(value = "", method = RequestMethod.GET)
	public ApiResponse<ListFeedResponse> getFeedList(HttpServletRequest request, 
			@RequestParam(value = "page", required = false, defaultValue = "1") int page,
			@RequestParam(value = "count", required = false, defaultValue = "20") int count) {
		return new ApiResponse<>(feedService.getFeedList(page, count));
	}
	
	@RequestMapping(value = "", method = RequestMethod.POST)
	public ApiResponse<ListFeedResponse> postFeed(HttpServletRequest request,
			@RequestBody PostFeedBody body) {
		int err = feedService.postFeed(body);
		if (err >= 0) {
			return new ApiResponse<ListFeedResponse>(feedService.getFeedList(PAGE_DEFAULT, COUNT_DEFAULT));
		}
		return new ApiResponse<>(ApiError.POST_FEED_ERROR);
	}
}
