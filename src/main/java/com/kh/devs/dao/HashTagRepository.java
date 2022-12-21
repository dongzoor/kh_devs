package com.kh.devs.dao;

import com.kh.devs.entity.HashTag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HashTagRepository extends JpaRepository<HashTag, Long> {
    List<HashTag> findBySocial_SocialId(Long socialId);
}
