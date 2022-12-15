package com.kh.devs.service;

import com.kh.devs.constant.UserRole;
import com.kh.devs.dao.UserRepository;
import com.kh.devs.dto.UserDTO;
import com.kh.devs.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Transactional // 메소드 종료시 commit or rollback
@Service
@Slf4j
public class UserService {
    // Repository와 연결
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    //회원가입
    public boolean regUser(String userEmail, String userNickname, String password, String phone, String profileImage) {
        // User Entity와 연결
        User user = new User();
        user.setUserEmail(userEmail);
        user.setUserNickname(userNickname);
        user.setPassword(password);
        user.setPhone(phone);
        user.setProfileImage(profileImage);
        user.setCreateDate(LocalDateTime.now());
        user.setUserRole(UserRole.ROLE_USER);
        User rst = userRepository.save(user);
        log.warn(rst.toString());
        return true;
    }

    // 회원 조회(이메일로 조회)
    public List<User> userSearch(String userEmail) {
        List<User> user = userRepository.findByUserEmail(userEmail);
        return user;
    }


    // 로그인 체크
    public List<User> loginCheck(String userEmail, String password) {
        List<User> userList = userRepository.findByUserEmailAndPassword(userEmail, password);

        return userList;
    }

    //회원정보 수정
    @Transactional
    public String UserUpdate(User user) {
        User userDb = user;
        userDb.setUserNickname(user.getUserNickname());
        userDb.setPassword(user.getPassword());
        userDb.setPhone(user.getPhone());
        userDb.setProfileImage(user.getProfileImage());
        userDb.setModifyDate(LocalDateTime.now());
        userRepository.save(userDb);
        return user.getUserEmail();
    }

    // 회원정보 찾기 - 아이디 찾기
    public User getUserEmail(String phone) {
        List<User> user = userRepository.findByPhone(phone);
        return user.get(0);
    }

    // 회원정보 찾기 - 비밀번호 찾기
    public User getPwd(String userEmail, String phone) {
        List<User> user = userRepository.findByUserEmailAndPhone(userEmail, phone);
        return user.get(0);
    }

     //회원 탈퇴
    @Transactional
    public boolean userDelete(String userEmail) {
        List<User> user = userRepository.findByUserEmail(userEmail);
        userRepository.delete(user.get(0));
        return true;
    }

//    @Transactional
//    public boolean userAdDelete(Long userId) {
//        List<User> user = userRepository.findByUserId(userId);
//        socialRepository.deleteById(socialId); // 오류가 터지면 익센셥 타서 신경 노노
//        return true;
//    }
    @Transactional
    public String deleteAdUser(Long userId) {
        userRepository.deleteById(userId); // 오류가 터지면 익센셥 타서 신경 노노
        return "ok";
    }


    // 어드민 유저 조회
    // 어드민 유저 상세조회
    public UserDTO getAdUserList(Long userId) {
        User user = userRepository.findById(userId).get();
        UserDTO userDTO = new UserDTO();
        userDTO.setUserId(user.getUserId());
        userDTO.setUserEmail(user.getUserEmail());
        userDTO.setUserNickname(user.getUserNickname());
        userDTO.setPassword(user.getPassword());
        userDTO.setPhone(user.getPhone());
        userDTO.setProfileImage(user.getProfileImage());
        userDTO.setCreateDate(user.getCreateDate());
        log.warn(userDTO.toString()); // 터미널 창
        System.out.println(userDTO);
        return userDTO;
    }

    // 어드민이 회원정보 수정
    @Transactional
    public boolean updateAdUser(Long userId ,String userNickname , String password , String phone ,String profileImage) {
        User user = userRepository.findById(userId)
                .orElseThrow(()->{
                    return new IllegalArgumentException("아이디 찾기 실패: 아이디를 찾을 수 없습니다.");
                });
        user.setUserNickname(userNickname);
        user.setPassword(password);
        user.setPhone(phone);
        user.setProfileImage(profileImage);
        user.setModifyDate(LocalDateTime.now());  // 수정일 정보 자동 기입
        return true;
    }

   //유저 전체조회
    public List<User> getUserList() {
        return userRepository.findAll();
    }
}
