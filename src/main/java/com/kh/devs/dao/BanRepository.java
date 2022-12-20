package com.kh.devs.dao;

import com.kh.devs.entity.Ban;
import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BanRepository extends JpaRepository<Ban, Long> {
    List<Ban> findByUserId(Long userId);

}
