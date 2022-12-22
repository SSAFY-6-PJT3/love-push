package com.cupid.joalarm.heart.repository;

import com.cupid.joalarm.heart.entity.HeartEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HeartRepository extends JpaRepository<HeartEntity, Long> {

}
