package com.kh.devs.controller;

import com.kh.devs.dao.StudyRepository;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.dto.UserDTO;
import com.kh.devs.entity.Admin;
import com.kh.devs.entity.Social;
import com.kh.devs.entity.Study;
import com.kh.devs.entity.User;
import com.kh.devs.service.AdminService;
import com.kh.devs.service.SocialService;
import com.kh.devs.service.StudyService;
import com.kh.devs.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;
    private final SocialService socialService;

    private final StudyRepository studyRepository;
    private  final StudyService studyService;

    private final UserService userService;

    // 스터디 게시판 전체 조회
    @GetMapping("/api/adStudies")
    public ResponseEntity<List<Study>> studyList(){
        List<Study> list = studyService.getStudyList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }




    //스터디 게시판 삭제
    @DeleteMapping("/api/deleteAdStudy/{studyId}")
    public ResponseEntity<?> deleteStudy(@PathVariable Long studyId) {
        return new ResponseEntity<>(studyService.deleteAdStudy(studyId) , HttpStatus.OK);
    }

// 유저 리스트 전체조회
    @GetMapping("/api/adUserList")
    public ResponseEntity<List<User>> userList(){
        List<User> list2 = userService.getUserList();
        return new ResponseEntity<>(list2, HttpStatus.OK);
    }
    //유저 개별조회
    @GetMapping("/api/adUserList/{Id}")  // 이름으로 회원 조회
    public ResponseEntity<UserDTO> AdUserList(@PathVariable Long Id) {
        UserDTO userDTO = userService.getAdUserList(Id);
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

     //어드민 로그인
    @PostMapping("/api/adLogin")
    public ResponseEntity<Admin> adminLogin(@RequestBody Map<String, String> loginData) {

        String adminEmail = loginData.get("adminEmail");
        String password = loginData.get("password");
        List<Admin> result = adminService.loginCheckAdmin(adminEmail, password);

        if (result.size() > 0) {
            return new ResponseEntity(result.get(0), HttpStatus.OK);
        } else if (result.size() == 0) {
            return new ResponseEntity(false, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.BAD_REQUEST);
        }
    }

    // 유저 수정기능
    @PutMapping("/api/adUserList/{Id}/update")
    public ResponseEntity<Boolean> adUserUpdate(@PathVariable("Id") long pathUserId, @RequestBody Map<String, String> editData) throws Exception {
        Long userId = pathUserId;
        String userNickname = editData.get("userNickname");
        String password = editData.get("password");
        String phone = editData.get("phone");
        String profileImage = editData.get("profileImage");
        String profileImagePath = editData.get("profileImagePath");
        boolean result = userService.updateAdUser(userId, userNickname, password, phone, profileImage,profileImagePath);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);  // 프론트의 res.data 값(true)으로 넘어옴
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
    //유저 삭제
//    @DeleteMapping("/AdMemberDelete/{userEmailDb}")
//    public ResponseEntity<User> deleteUser(@PathVariable("userEmailDb") String userEmailDb) {
//        String userEmail = userEmailDb;
//
//        boolean result = userService.userDelete(userEmail);
//        if (result) {
//            return new ResponseEntity(true, HttpStatus.OK);
//        } else {
//            return new ResponseEntity(false, HttpStatus.OK);
//        }
//    }

    // 유저 아이디 삭제
    @DeleteMapping("/api/User/{id}")
    public ResponseEntity<?> deleteByUserId(@PathVariable Long id ) {
        return new ResponseEntity<>(userService.deleteAdUser(id), HttpStatus.OK);
    }

    // 소셜게시판 리스트 불러오기
    @GetMapping("/api/adSocialList2")
    public ResponseEntity<List<Social>> socialList2() {
        List<Social> list = socialService.getAdSocialList2();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
    // 소셜게시판 리스트 불러오기2
    @GetMapping("/api/adSocialList")
    public ResponseEntity<List<SocialDTO>> socialList() {
        List<SocialDTO> list = socialService.getSocialList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // 소셜게시판 게시글 삭제
    @DeleteMapping("/api/adSocialList/{Id}")
    public Map<String, Object> delete(@PathVariable("Id") long Id) {
        Map<String, Object> response = new HashMap<>();
        if (socialService.delSocial(Id) > 0) {
            response.put("result", "SUCCESS"); // front 의 res.data.result === "SUCCESS" 와 연결된당!!!
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }

    @DeleteMapping("/api/SocialList/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id ) {
        return new ResponseEntity<>(socialService.deleteSocial(id), HttpStatus.OK);
    }

}
