package com.kh.devs.dao;

import com.kh.devs.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository  extends JpaRepository<Admin, Long> {

    List<Admin> findByAdminEmailAndPassword(String adminEmail, String password);
}
