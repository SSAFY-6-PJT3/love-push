package com.cupid.joalarm.feed.media;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {

    private GlobalConfig config;

    @Autowired
    public WebConfiguration(GlobalConfig config) {
        this.config = config;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String resourcePattern = config.getResourcePath()+"**";

        registry.addResourceHandler(resourcePattern)
                .addResourceLocations("file:///"+ config.getUploadPath());
        System.out.println("resourcePattern = " + resourcePattern);

    }
}

