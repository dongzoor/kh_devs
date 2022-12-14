package com.kh.devs.service;

import com.kh.devs.dao.AdminRepository;
import com.kh.devs.entity.Admin;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Transactional
@Service
@Slf4j
public class AdminService {


    private AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    // 어드민 로그인 체크
    public List<Admin> loginCheckAdmin(String adminEmail, String password) {
        List<Admin> AdminList = adminRepository.findByAdminEmailAndPassword(adminEmail, password);
        return AdminList;
    }

//    // 어드민 유저 상세조회
//    public UserDTO getAdUserList(Long userId) {
//        User user = userRepository.findById(userId).get();
//        UserDTO userDTO = new UserDTO();
//        userDTO.setUserId(user.getUserId());
//        userDTO.setUserEmail(user.getUserEmail());
//        userDTO.setUserNickname(user.getUserNickname());
//        userDTO.setPassword(user.getPassword());
//        userDTO.setPhone(user.getPhone());
//        userDTO.setProfileImage(user.getProfileImage());
//        userDTO.setCreateDate(user.getCreateDate());
//        log.warn(userDTO.toString()); // 터미널 창
//        System.out.println(userDTO);
//        return userDTO;
//    }

}
