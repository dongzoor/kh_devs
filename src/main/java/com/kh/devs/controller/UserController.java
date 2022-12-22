package com.kh.devs.controller;

import com.kh.devs.dto.MailDTO;
import com.kh.devs.entity.Ban;
import com.kh.devs.entity.User;
import com.kh.devs.sendMail.SendMail;
import com.kh.devs.service.AdminService;
import com.kh.devs.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
@RequestMapping("/api")
public class UserController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Autowired
    private UserService userService;
    @Autowired
    private AdminService adminService;

    public UserController(UserService userService, AdminService adminService) {
        this.userService = userService;
        this.adminService = adminService;
    }

    // ID(Email) 중복체크
    @PostMapping("/duplCheck")
    public ResponseEntity<Map<String, String>> duplCheck(@RequestBody Map<String, String> findData) {
        String userEmail = findData.get("userEmail");
        List<User> user = userService.userSearch(userEmail);

        if (user.size() > 0) {
            return new ResponseEntity(false, HttpStatus.OK);
        } else {
            return new ResponseEntity(true, HttpStatus.OK);
        }
    }

    // 전화번호 중복체크
    @PostMapping("/phoneDuplCheck")
    public ResponseEntity<Map<String, String>> phoneDuplCheck(@RequestBody Map<String, String> findPhoneData) {
        String phone = findPhoneData.get("phone");
        List<User> user = userService.getUserEmail(phone);
        if (user.size() > 0) {
            return new ResponseEntity(false, HttpStatus.OK);
        } else {
            return new ResponseEntity(true, HttpStatus.OK);
        }
    }

    // 회원가입
    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Map<String, String>> userRegister(@RequestBody Map<String, String> regData) throws Exception {
        String getUserEmail = regData.get("userEmail");
        String getUserNickname = regData.get("userNickname");
//        String getPassword = bCryptPasswordEncoder.encode(regData.get("password"));
        String getPassword = regData.get("password");
        String getPhone = regData.get("phone");
        String getProfileImage = regData.get("profileImage");
        String getProfileImagePath = regData.get("profileImagePath");

        boolean result = userService.regUser(getUserEmail, getUserNickname, getPassword, getPhone, getProfileImage, getProfileImagePath);
        if (result) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.BAD_REQUEST);
        }
    }


    // 일반 로그인
    @PostMapping("/login")
    public ResponseEntity<User> memberLogin(@RequestBody Map<String, String> loginData) {

        String userEmail = loginData.get("userEmail");
        String password = loginData.get("password");
        List<User> users = userService.userSearch(userEmail);

        List<Ban> banUsers = adminService.banUserSearch(userEmail);

        // 아이디가 틀린경우
//        if (users.size() == 0) {
//            return new ResponseEntity(false, HttpStatus.OK);
//        }

//        Boolean result = bCryptPasswordEncoder.matches(password, users.get(0).getPassword());

        if (users.size() > 0) {
            // return new ResponseEntity(users.get(0), HttpStatus.OK);
            if (banUsers.size() == 0) return new ResponseEntity(users.get(0), HttpStatus.OK);
            else return new ResponseEntity("BAN_USER", HttpStatus.OK);

        } else if (users.size() == 0) {
            return new ResponseEntity(false, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.BAD_REQUEST);
        }


    }

    // 카카오 로그인
    @PostMapping("/kakaoLogin")
    public ResponseEntity<User> kakaoLogin(@RequestBody Map<String, String> loginData) {

        String userEmail = loginData.get("userEmail");
        String userNickname = loginData.get("userNickname");
        List<User> users = userService.userSearch(userEmail);

        // 이미 가입된 정보가 있는 경우
        if (users.size() > 0) {
            return new ResponseEntity(users.get(0), HttpStatus.OK);
        } else if (users.size() == 0) {
            return new ResponseEntity(false, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.BAD_REQUEST);
        }
    }

    //회원정보 수정
    @PutMapping("/update")
    public ResponseEntity<User> userUpdate(@RequestBody Map<String, String> updateData) {

        String userEmail = updateData.get("userEmail");
        String password = updateData.get("password");
        String userNickname = updateData.get("userNickname");
        String phone = updateData.get("phone");
        String profileImage = updateData.get("profileImage");
        String profileImagePath = updateData.get("profileImagePath");

        List<User> result = userService.userSearch(userEmail);

        String rst = null;

        if (result.size() > 0) {
            result.get(0).setUserNickname(userNickname);
            result.get(0).setPhone(phone);
            result.get(0).setProfileImage(profileImage);
            result.get(0).setProfileImagePath(profileImagePath);

            if (!"".equals(password)) {
//                result.get(0).setPassword(bCryptPasswordEncoder.encode(password));
                result.get(0).setPassword(password);
            }

            rst = userService.UserUpdate(result.get(0));
        }

        List<User> userInfo = userService.userSearch(rst);

        if (userInfo.size() > 0) {
            return new ResponseEntity(userInfo.get(0), HttpStatus.OK);
        } else if (result.size() == 0) {
            return new ResponseEntity(false, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 회원정보 찾기 - 아이디 찾기
    @PostMapping("/findId")
    public ResponseEntity<User> findUserEmail(@RequestBody Map<String, String> findData) {
        String phone = findData.get("phone");
        List<User> user = userService.getUserEmail(phone);

        if (user.size() > 0) {
            return new ResponseEntity(user.get(0), HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.OK);
        }
    }

    // 회원정보 찾기 - 비밀번호 찾기
    @PostMapping("/findPwd")
    public ResponseEntity<User> findPwd(@RequestBody Map<String, String> findData) {
        String userEmail = findData.get("userEmail");
        String phone = findData.get("phone");

        // 사용자 정보 조회
        List<User> user = userService.getPwd(userEmail, phone);

        if (user.size() > 0) {

            User userInfo = user.get(0);

            // 비밀번호 랜덤생성
            String newPw = null;
            int min = 100000;
            int max = 999999;
            double doubleRanNum = Math.floor(Math.random() * (max - min + 1)) + min;
            int intRanNum = (int) doubleRanNum;
            newPw = String.valueOf(intRanNum);

            String password = "devs" + newPw + "!";

            // 랜덤생성한 비밀번호 저장
//            userInfo.setPassword(bCryptPasswordEncoder.encode(newPw));
            userInfo.setPassword(password);
            userService.UserUpdate(userInfo);

            // 메일생성
            SendMail sendmail = new SendMail();
            MailDTO mail = new MailDTO();

            mail.setContent(password);
            mail.setSender(userInfo.getUserEmail());
            mail.setTitle("[DevS] " + userInfo.getUserNickname() + "님의 비밀번호 찾기 메일입니다.");
            sendmail.sendMail(mail);

            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.OK);
        }
    }


    // 회원탈퇴
    @DeleteMapping("/delete/{userEmail}")
    public ResponseEntity<User> deleteUser(@PathVariable("userEmail") String userEmailDb) {
        String userEmail = userEmailDb;

        boolean result = userService.userDelete(userEmail);
        if (result) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.OK);
        }
    }

}
