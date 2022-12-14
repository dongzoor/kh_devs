package com.kh.devs.controller;

import com.kh.devs.entity.User;
import com.kh.devs.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@RequestMapping("/user")
@Slf4j
public class UserController {
    // Service 로직 연결
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 회원가입
    @PostMapping("/register")
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
    public ResponseEntity<User> userLogin(@RequestBody Map<String, String> loginData) {

        String userEmail = loginData.get("userEmail");
        String password = loginData.get("password");
        List<User> result = userService.loginCheck(userEmail, password);

        if (result.size() > 0) {
            return new ResponseEntity(result.get(0), HttpStatus.OK);
        } else if (result.size() == 0) {
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
        String inputPwNow = updateData.get("inputPwNow");
        String userNickname = updateData.get("userNickname");
        String phone = updateData.get("phone");
        String profileImage = updateData.get("profileImage");

        List<User> result = userService.loginCheck(userEmail, inputPwNow);

        String rst = null;

        if (result.size() > 0) {
            result.get(0).setUserNickname(userNickname);
            result.get(0).setPhone(phone);
            result.get(0).setProfileImage(profileImage);
            result.get(0).setPassword(password);
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

}

