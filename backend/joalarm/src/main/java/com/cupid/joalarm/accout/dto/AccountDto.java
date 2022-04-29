package com.cupid.joalarm.accout.dto;

import com.cupid.joalarm.accout.entity.Account;
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

//    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
//    private Long seq;

    @NotNull
    @Size(min = 3,max = 50)
    private String id;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotNull
    @Size
    private String password;

    @NotNull
    @Size(min = 3, max = 50)
    private String emoji;


    public static AccountDto fromEntity(Account account){
        if(account==null) return null;

        return AccountDto.builder()
//                .seq(account.getAccountSeq())
                .id(account.getId())
                .emoji(account.getEmoji())
                .build();
    }

}
