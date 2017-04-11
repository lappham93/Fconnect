package com.mit.app;

import javax.servlet.DispatcherType;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Lazy;
import org.springframework.core.env.Environment;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
 * 
 * @author TinnyLe
 *
 */

@SpringBootApplication
@EnableMongoAuditing
@Lazy
@ComponentScan(basePackages = { "com.mit.app", "com.mit.controllers", "com.mit.user", "com.mit.address", "com.mit.seq",
		"com.mit.session", "com.mit.user.repositories", "com.mit.data", "com.mit.service", "com.mit.asset", "com.mit.utils",
		"com.mit.banner", "com.mit.promotion", "com.mit.provider"})
public class Application {
	public static Environment EnvConfig;
	public static ApplicationContext AppCtx;
	@Value("${admin.prefix}")
	private String adminPrefix;
	@Value("${admin.resources.path}")
	private String resourcesPath;
	
	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(Application.class, args);
		EnvConfig = ctx.getEnvironment();
		AppCtx = ctx;
		System.out.println("Start server");
		
	}
	
	@Bean
	public MultipartResolver multiPartResolver() {
		return new CommonsMultipartResolver();
	}
	
	@Bean
	public FilterRegistrationBean swaggerFilter() throws Exception {
		FilterRegistrationBean registration = new FilterRegistrationBean(new MyUrlRewriteFilter());
		registration.addUrlPatterns("/swagger/*");
		registration.addUrlPatterns(adminPrefix + "/*");
		registration.setDispatcherTypes(DispatcherType.REQUEST);
		registration.setOrder(1);
		return registration;
	}

//	@Bean
//	public FilterRegistrationBean registrationLogging() {
//		Filter filter = new LoggingFilter();
//		FilterRegistrationBean registration = new FilterRegistrationBean(filter);
//		registration.addUrlPatterns("/*");
//		registration.setDispatcherTypes(DispatcherType.REQUEST);
//		return registration;
//	}

//	@Bean
//	public FilterRegistrationBean authenticationRequest(SessionManagerImpl sessionManager) {
//		AdminAuthenticationFilter<UserSession> filter = new AdminAuthenticationFilter<>(sessionManager);
//		FilterRegistrationBean registration = new FilterRegistrationBean(filter);
//		registration.addUrlPatterns("/*");
//		registration.addInitParameter("excludePatterns", StringUtils.join(new String[]{"/login", resourcesPath, "/register", "/socket"}, ","));
//		registration.addInitParameter("profileClasses", StringUtils.join(new String[]{AdminProfile.class.getSimpleName(), Profile.class.getSimpleName()}, ","));
//		registration.addInitParameter("redirectPath", adminPrefix + "/login");
//		registration.setDispatcherTypes(DispatcherType.REQUEST);
//		registration.setOrder(2);
//		return registration;
//	}
	
}
