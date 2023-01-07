package com.cupid.joalarm.school.repository;

import com.cupid.joalarm.school.entity.School;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SchoolRepository extends JpaRepository<School, Long> {
    School findByName(String name);
}