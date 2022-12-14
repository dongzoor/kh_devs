package com.kh.devs.dao;

import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserNickname(String userNickname);
//    Optional<User> findByEmail(String email);

    List<User> findByUserEmail(String userEmail);

    List<User> findByUserEmailAndPassword(String userEmail, String password);

//    User findByUserId(String UserId);

    List<User> findAll();

    List<User> findByUserId(Long userId);
}

