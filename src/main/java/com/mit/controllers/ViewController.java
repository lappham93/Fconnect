package com.mit.controllers;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping(value = "")
public class ViewController {

	@RequestMapping(value = "/feed", method = RequestMethod.GET)
	public ModelAndView feedPage(HttpServletRequest request) {
		return new ModelAndView("feed");
	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public ModelAndView loginPage(HttpServletRequest request) {
		return new ModelAndView("login");
	}

	@RequestMapping(value = "/profile", method = RequestMethod.GET)
	public ModelAndView profilePage(HttpServletRequest request) {
		return new ModelAndView("profile");
	}

}
