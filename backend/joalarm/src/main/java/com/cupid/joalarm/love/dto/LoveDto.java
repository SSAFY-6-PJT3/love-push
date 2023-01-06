package com.cupid.joalarm.love.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoveDto {
    private Long accountSeq;
    private String lastName;
    private String firstName;
    private Long schoolSeq;
}
