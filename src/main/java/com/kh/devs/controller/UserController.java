package com.kh.devs.controller;

import com.kh.devs.dto.MailDTO;
import com.kh.devs.entity.User;
import com.kh.devs.sendMail.SendMail;
import com.kh.devs.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

//@CrossOrigin(origins = "http://localhost:3000")
@RestController
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입
    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Map<String, String>> userRegister(@RequestBody Map<String, String> regData) {
        String getUserEmail = regData.get("userEmail");
        String getUserNickname = regData.get("userNickname");
        String getPassword = regData.get("password");
        String getPhone = regData.get("phone");
        String getProfileImage = regData.get("profileImage");

        boolean result = userService.regUser(getUserEmail, getUserNickname, getPassword, getPhone, getProfileImage);
        if (result) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.BAD_REQUEST);
        }
    }


    // 로그인
    @PostMapping("/login")
    public ResponseEntity<User> memberLogin(@RequestBody Map<String, String> loginData) {

        String userEmail = loginData.get("userEmail");
        String password = loginData.get("password");
        List<User> users = userService.loginCheck(userEmail,password);

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

        List<User> result = userService.userSearch(userEmail);

        String rst = null;

        if (result.size() > 0) {
            result.get(0).setUserNickname(userNickname);
            result.get(0).setPhone(phone);
            result.get(0).setProfileImage(profileImage);
            if (!"".equals(password)) {
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
        User user = userService.getUserEmail(phone);
        return new ResponseEntity(user, HttpStatus.OK);
    }

    // 회원정보 찾기 - 비밀번호 찾기
    @PostMapping("/findPwd")
    public ResponseEntity<User> findPwd(@RequestBody Map<String, String> findData) {
        String userEmail = findData.get("userEmail");
        String phone = findData.get("phone");

        // 사용자 정보 조회
        User user = userService.getPwd(userEmail, phone);

        if (user != null) {

            // 비밀번호 랜덤생성
            String newPw = null;
            int min = 100000;
            int max = 999999;
            double doubleRanNum = Math.floor(Math.random() * (max - min + 1)) + min;
            int intRanNum = (int) doubleRanNum;
            newPw = String.valueOf(intRanNum);

            // 랜덤생성한 비밀번호 저장
            user.setPassword(newPw);
            userService.UserUpdate(user);

            // 메일생성
            SendMail sendmail = new SendMail();
            MailDTO mail = new MailDTO();

            mail.setContent(newPw);
            mail.setSender(user.getUserEmail());
            mail.setTitle("[DevS]" + user.getUserNickname() + "님의 비밀번호 찾기 메일입니다.");
            sendmail.sendMail(mail);
        }

        if (user != null) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.OK);
        }
    }

    // ID(Email) 중복체크
    @PostMapping("duplCheck")
    public ResponseEntity<Map<String, String>> duplCheck(@RequestBody Map<String, String> findData) {
        String userEmail = findData.get("userEmail");
        List<User> user = userService.userSearch(userEmail);

        if (user.size() > 0) {
            return new ResponseEntity(false, HttpStatus.OK);
        } else {
            return new ResponseEntity(true, HttpStatus.OK);
        }
    }

    // 회원탈퇴
    @DeleteMapping("/delete/{userEmailDb}")
    public ResponseEntity<User> deleteUser(@PathVariable("userEmailDb") String userEmailDb) {
        String userEmail = userEmailDb;

        boolean result = userService.userDelete(userEmail);
        if (result) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.OK);
        }
    }

}
