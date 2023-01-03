package com.cupid.joalarm.account.dto;

import com.cupid.joalarm.account.entity.Account;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountDto {

    @NotNull
    @Size(min = 3,max = 50)
    private String id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size
    private String password;

    @NotNull
    private String emoji;

    private String firstName;

    private String lastName;

    private String school;

    public static AccountDto fromEntity(Account account){
        if(account==null) return null;

        return AccountDto.builder()
                .id(account.getId())
                .emoji(account.getEmoji())
                .firstName(account.getFirstName())
                .lastName(account.getLastName())
                .school(account.getSchool().getName())
                .build();
    }

}
