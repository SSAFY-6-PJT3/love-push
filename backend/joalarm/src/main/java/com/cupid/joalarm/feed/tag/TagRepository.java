package com.cupid.joalarm.feed.tag;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
    Tag findByName(String name);
}