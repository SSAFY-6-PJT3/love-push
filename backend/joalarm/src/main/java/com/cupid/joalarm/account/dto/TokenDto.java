package com.cupid.joalarm.account.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

/**
 * Token 정보 Response 하기위한 DTO
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TokenDto {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long seq;

    private String token;

    private String emojiUrl;

    private Long schoolSeq;

    private String schoolName;
}
