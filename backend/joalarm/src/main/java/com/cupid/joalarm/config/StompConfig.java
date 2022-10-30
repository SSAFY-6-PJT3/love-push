package com.cupid.joalarm.config;

import com.cupid.joalarm.gpsSector.controller.GpsSectorController;
import com.cupid.joalarm.gpsSector.repository.GpsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpAttributesContextHolder;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.messaging.*;

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
        registry.addEndpoint("/ws-stomp").setAllowedOrigins("*").withSockJS();
    }

    @EventListener
    public void handleSessionConnect(SessionConnectEvent event) {
        System.out.println("CONNECT / " + SimpAttributesContextHolder.currentAttributes().getSessionId());
        SimpAttributesContextHolder.currentAttributes().setAttribute("GPS", "");
//        System.out.println(SimpAttributesContextHolder.currentAttributes().getAttribute("TEST"));
//        System.out.println(event);
    }

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
        String gpsKey = (String) SimpAttributesContextHolder.currentAttributes().getAttribute("GPS");
        String sessionId = event.getSessionId();
        System.out.println("DISCONNECT / " + sessionId + " / " + gpsKey);
        gpsRepository.dropUser(gpsKey, sessionId);
    }

//    @EventListener
//    public void test(DefaultSimpUserRegistry u) {
//        System.out.println("DefaultSimpUserRegistry: " + u);
//    }
//
//    @EventListener
//    public void test2(SubProtocolWebSocketHandler u) {
//        System.out.println("SubProtocolWebSocketHandler: " + u);
//    }
//
//    @EventListener
//    public void test3(AbstractSubProtocolEvent u) {
//        System.out.println("AbstractSubProtocolEvent: " + u);
//    }
}
