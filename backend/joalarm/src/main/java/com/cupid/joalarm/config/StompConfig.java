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
import org.springframework.web.socket.messaging.*;

import java.util.HashMap;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class StompConfig implements WebSocketMessageBrokerConfigurer {
//    private final GpsRepository gpsRepository;
    private HashMap<String, String> hashMap = new HashMap<>();

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/sub");
        registry.setApplicationDestinationPrefixes("/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-stomp").setAllowedOrigins("http://localhost:3000").withSockJS();
    }

    @EventListener
    public void handleSessionConnect(SessionConnectEvent event) {
        System.out.println("CONNECT / " + SimpAttributesContextHolder.currentAttributes().getSessionId());
//        SimpAttributesContextHolder.currentAttributes().setAttribute("TEST", "TEST");
//        System.out.println(SimpAttributesContextHolder.currentAttributes().getAttribute("TEST"));
//        System.out.println(event);
    }

    @EventListener
    public void handleSessionDisconnect(SessionDisconnectEvent event) {
//        System.out.println(SimpAttributesContextHolder.currentAttributes().getAttribute("TEST"));
        System.out.println("DISCONNECT / " + event.getSessionId());
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
