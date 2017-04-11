package com.mit.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class ResourcesConfig extends WebMvcConfigurerAdapter {
	@Value("${admin.resources.path}")
	private String resourcesPath;
	
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler(resourcesPath + "/**").addResourceLocations("classpath:static/");
    }
    
}