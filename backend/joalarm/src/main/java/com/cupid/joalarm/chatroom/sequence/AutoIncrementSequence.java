package com.cupid.joalarm.chatroom.sequence;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;

@Getter
@Setter
@Document(collection = "auto_sequence")
public class AutoIncrementSequence {
    @Id
    private String id;
    private Long seq;
}
