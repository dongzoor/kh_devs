package com.kh.devs.controller;

import com.kh.devs.dto.SocialDTO;
import com.kh.devs.service.SocialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/social")
@RequiredArgsConstructor
@Slf4j
public class SocialController {
    private final SocialService socialService; // Controller 는 넘어온 요청을 처리하기 위해 Service 를 호출한다.

    // [hashtag] 검색
    @GetMapping("/hashtag/{tag}")
    public ResponseEntity<List<SocialDTO>> searchHashtag(@PathVariable("tag") String tag) {
        List<SocialDTO> socialDTO = socialService.searchHashtag(tag);
        return new ResponseEntity<>(socialDTO, HttpStatus.OK);
    }

    // [제목+내용] 검색
    @GetMapping("/titleContent/{tc}")
    public ResponseEntity<List<SocialDTO>> searchTorC(@PathVariable("tc") String tc) {
        List<SocialDTO> socialDTO = socialService.searchTorC(tc);
        return new ResponseEntity<>(socialDTO, HttpStatus.OK);
    }

    // [작성자 닉네임] 검색
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<List<SocialDTO>> searchNickname(@PathVariable("nickname") String nickname) {
        List<SocialDTO> socialDTO = socialService.searchNickname(nickname);
        return new ResponseEntity<>(socialDTO, HttpStatus.OK);
    }

    // social 전체 목록 조회
    @GetMapping
    public ResponseEntity<List<SocialDTO>> socialList() {
        List<SocialDTO> list = socialService.getSocialList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    // social 디테일 페이지 조회
    @GetMapping("/{Id}")
    public ResponseEntity<SocialDTO> socialList(@PathVariable Long Id) {
        SocialDTO socialDTO = socialService.getSocialList(Id);
        return new ResponseEntity<>(socialDTO, HttpStatus.OK);
    }

    // social 작성(등록)
    @PostMapping("/write")
    public Map<String, Object> socialWrite(@RequestBody Map<String, String> regData) throws Exception {
        SocialDTO socialDTO = new SocialDTO();
        String[] strToArray = regData.get("hashtags").split(","); // front 에서 배열을 ","로 join 해서 보냈기 때문
        Map<String, Object> response = new HashMap<>();
        String userEmail = regData.get("userEmail");
        String title = regData.get("title");
        String content = regData.get("content");
        String image = regData.get("image");
        String imageId = regData.get("imageId");
        List<String> hashtagList = List.of(strToArray);
        Map<String, Object> result = socialService.regSocial(userEmail, title, content, hashtagList, image, imageId);
        if (result.get("result") == "true") {
            response.put("result", "SUCCESS");
            response.put("socialId", result.get("socialId"));
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }

    // social 수정
    @PutMapping("/{Id}/update")
    public ResponseEntity<Boolean> socialUpdate(@PathVariable("Id") long pathSocialId, @RequestBody Map<String, String> editData) throws Exception {
        String[] strToArray = editData.get("hashtags").split(","); // front 에서 배열을 ","로 join 해서 보냈기 때문
        Long socialId = pathSocialId;
        String title = editData.get("title");
        String content = editData.get("content");
        List<String> hashtagList = List.of(strToArray);
        String image = editData.get("image");
        String imageId = editData.get("imageId");
        boolean result = socialService.updateSocial(socialId, title, content, hashtagList, image, imageId);
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);  // 프론트의 res.data 값(true)으로 넘어온다!!!
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    // social 삭제
    @DeleteMapping("/{Id}")
    public Map<String, Object> deleteSocial(@PathVariable("Id") long Id) {
        Map<String, Object> response = new HashMap<>();
        if (socialService.delSocial(Id) > 0) {
            response.put("result", "SUCCESS"); // front 의 res.data.result === "SUCCESS"
        } else {
            response.put("result", "FAIL");
            response.put("reason", "일치하는 게시글 정보가 없습니다.");
        }
        return response;
    }
}