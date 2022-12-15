package com.kh.devs.dao;

import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByPhone(String phone);

    List<User> findByUserEmail(String userEmail);

    List<User> findByUserEmailAndPassword(String userEmail, String password);

    List<User> findByUserEmailAndPhone(String userEmail, String phone);

    // admin용
    List<User> findAll();

    // admin용
    List<User> findByUserId(Long userId);
}

