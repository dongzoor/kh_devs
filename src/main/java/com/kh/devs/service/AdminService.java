package com.kh.devs.service;

import com.kh.devs.dao.AdminRepository;
import com.kh.devs.dao.BanRepository;
import com.kh.devs.entity.Admin;
import com.kh.devs.entity.Ban;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Transactional
@Service
@Slf4j
public class AdminService {

    private BanRepository banRepository;
    private AdminRepository adminRepository;

    public AdminService(AdminRepository adminRepository, BanRepository banRepository) {
        this.adminRepository = adminRepository;
        this.banRepository = banRepository;
    }

    // 어드민 로그인 체크
    public List<Admin> loginCheckAdmin(String adminEmail, String password) {
        List<Admin> AdminList = adminRepository.findByAdminEmailAndPassword(adminEmail, password);
        return AdminList;
    }

    public boolean updateAdBanUser(Long userId ,String userNickname ,String userEmail,String phone) {
        Ban banUser = new Ban();
        banUser.setUserId(userId);
        banUser.setUserNickname(userNickname);
        banUser.setUserEmail(userEmail);
        banUser.setPhone(phone);
        banUser.setModifyDate(LocalDateTime.now());  // 수정일 정보 자동 기입
        Ban rst = banRepository.save(banUser);
//        log.warn(rst.toString());
        return true;
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
