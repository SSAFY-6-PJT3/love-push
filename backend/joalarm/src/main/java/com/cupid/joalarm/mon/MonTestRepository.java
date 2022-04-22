package com.cupid.joalarm.mon;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MonTestRepository extends MongoRepository<MonTest, String> {
    public MonTest findByTitle(String title);
}
