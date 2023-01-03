package com.cupid.joalarm.feed.media;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.util.ObjectUtils;

import javax.annotation.PostConstruct;
import java.util.Properties;

@Configuration
public class GlobalConfig {

    private final ApplicationContext context;
    private final ResourceLoader resourceLoader;

    @Autowired
    public GlobalConfig(ApplicationContext context, ResourceLoader resourceLoader) {
        this.context = context;
        this.resourceLoader = resourceLoader;
    }

    private String uploadPath;
    private String resourcePath;

    @PostConstruct
    public void init(){
        String[] activeProfiles = context.getEnvironment().getActiveProfiles();
        String activeProfile = "local";
        if(!ObjectUtils.isEmpty(activeProfiles)){
            activeProfile = activeProfiles[0];
        }
        String resourcePath = String.format("classpath:globals/global-%s.properties",activeProfile);
        try{
            Resource resource = resourceLoader.getResource(resourcePath);
            Properties properties = PropertiesLoaderUtils.loadProperties(resource);

            this.uploadPath = properties.getProperty("uploadFile.path");
            this.resourcePath = properties.getProperty("uploadFile.resourcePath");
        }catch (Exception e){
            System.out.println("e = " + e);
        }
    }

    public String getUploadPath() {
        return uploadPath;
    }

    public String getResourcePath() {
        return resourcePath;
    }

    public String getUploadFilePath() {
        return uploadPath;
    }

    public String getUploadResourcePath() {
        return resourcePath;
    }
}
