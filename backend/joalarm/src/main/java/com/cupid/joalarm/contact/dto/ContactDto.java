package com.cupid.joalarm.contact.dto;

import lombok.*;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ContactDto {

    @NotNull
    private String type;

    @NotNull
    private String content;

}