package com.cupid.joalarm.accout.dto;

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
    private String token;
    private String emojiUrl;
}
