package com.cupid.joalarm.mon;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MonTestService {

    public MonTestRepository monTestRepository;

    @Autowired
    public MonTestService(MonTestRepository monTestRepository) {
        this.monTestRepository = monTestRepository;
    }

    @Transactional
    public ResponseEntity<?> createTest(MonTestDto monTestDto) {

        MonTest monTest = MonTest.builder()
                .testId(monTestDto.getTestId())
                .title(monTestDto.getTitle())
                .content(monTestDto.getContent())
                .build();

        monTestRepository.save(monTest);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    public MonTestDto returnTestDto(MonTestDto monTestDto) {

        String title = monTestDto.getTitle();

        MonTest monTest = monTestRepository.findByTitle(title);

        MonTestDto resDto = new MonTestDto();
        resDto.setTestId(monTest.getTestId());
        resDto.setTitle(monTest.getTitle());
        resDto.setContent(monTest.getContent());

        return resDto;
    }


}
