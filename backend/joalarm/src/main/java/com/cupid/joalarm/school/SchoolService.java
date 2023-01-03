package com.cupid.joalarm.school;

import com.cupid.joalarm.account.entity.Account;
import com.cupid.joalarm.feed.Feed;
import com.cupid.joalarm.feed.FeedDto;
import com.cupid.joalarm.feed.tag.TagDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class SchoolService {

    public SchoolRepository schoolRepository;

    @Autowired
    public SchoolService(SchoolRepository schoolRepository) {
        this.schoolRepository = schoolRepository;
    }

    @Transactional
    public ResponseEntity<?> enrollSchool(SchoolDto schoolDto){

        School school = School.builder()
                .name(schoolDto.getName())
                .kind(schoolDto.getKind())
                .build();

        schoolRepository.save(school);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public String findSchool(Long schoolSeq){

        Optional<School> opsSchoolName = schoolRepository.findById(schoolSeq);
        School school = opsSchoolName.get();
        String name = school.getName();
        return name;
    }
}
