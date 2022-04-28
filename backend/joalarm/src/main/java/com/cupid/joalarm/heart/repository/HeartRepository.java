package com.cupid.joalarm.heart.repository;

import com.cupid.joalarm.heart.entity.HeartEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface HeartRepository extends MongoRepository<HeartEntity, String> {
    public List<HeartEntity> findAllBySendUser(long user);
}
