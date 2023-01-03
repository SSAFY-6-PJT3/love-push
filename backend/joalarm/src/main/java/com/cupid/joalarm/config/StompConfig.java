package com.cupid.joalarm.config;

import com.cupid.joalarm.gpsSector.repository.GpsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {

    private final GpsRepository gpsRepository;

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp")
                .setAllowedOrigins("https://www.someone-might-like-you.com", "http://localhost:3000")
                .withSockJS();
    }

    @EventListener
    public void handleSessionConnect(SessionConnectEvent event) {
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", "");
    }

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        String gpsKey = (String) SimpAttributesContextHolder.currentAttributes().getAttribute("GPS");
        String sessionId = event.getSessionId();
        gpsRepository.dropUser(gpsKey, sessionId);
    }
}
