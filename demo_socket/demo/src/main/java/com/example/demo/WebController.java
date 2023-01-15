package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
public class WebController {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @MessageMapping("/hello")
//    @SendTo("/topic/hi")
//    public Hello greeting(User user) throws Exception {
//        return new Hello(user.getName() + " : " + user.getMessage());
//    }

    public void greeting(User user) throws Exception {
//        Cổng mà server sẽ hứng tin nhắn
        simpMessagingTemplate.convertAndSend("/topic/public",new Hello( user.getName() + " : " + user.getMessage()));
    }

}
