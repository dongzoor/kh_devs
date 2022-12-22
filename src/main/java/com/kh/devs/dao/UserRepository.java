package com.kh.devs.dao;

import com.kh.devs.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByPhone(String phone);

    List<User> findByUserEmail(String userEmail);

    List<User> findByUserNickname(String userNickname);

    List<User> findByUserEmailAndPassword(String userEmail, String password);

    List<User> findByUserEmailAndPhone(String userEmail, String phone);

    // JY - Social 닉네임 검색 기능
    @Query(value = "SELECT * FROM users  WHERE user_nickname like %:nickname% ", nativeQuery = true)
    List<User> findByUserNicknameLike(@Param("nickname") String nickname);

    // admin용
    List<User> findAll();

    // admin용
    List<User> findByUserId(Long userId);
}

