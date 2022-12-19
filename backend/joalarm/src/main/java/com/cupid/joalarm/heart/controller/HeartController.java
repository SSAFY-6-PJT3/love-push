package com.cupid.joalarm.heart.controller;

import com.cupid.joalarm.heart.dto.HeartDto;
import com.cupid.joalarm.heart.service.HeartService;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class HeartController {

    private final HeartService heartService;

    @PostMapping("/heart")
    public ResponseEntity<HeartDto> sendHeart(@RequestBody HeartDto heartDto) {
        Optional<HeartDto> heartDtoOptional = heartService.setHeart(heartDto);

        if (heartDtoOptional.isEmpty()) {
            return new ResponseEntity<>(new HeartDto(), HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(heartDto, HttpStatus.OK);
    }

}
