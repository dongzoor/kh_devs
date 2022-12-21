package com.kh.devs.controller;

import com.kh.devs.service.HashTagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequiredArgsConstructor
@Slf4j
public class HashTagController {
    private final HashTagService hashTagService;

    //     해시태그 작성
    @PostMapping(value = "/hashtag/post/{id}")
//    @RequestMapping(method = RequestMethod.POST, value = "/hashtag/post/{id}", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Boolean> tagWrite(@RequestBody List<Map<String, String>> regData, @PathVariable("id") long pathSocialId) {
        boolean result = false;
        System.out.println(regData);
        System.out.println("#######################");
        System.out.println(pathSocialId);
        for (int i = 1; i <= regData.size(); i++) {
            System.out.println("#############");
            System.out.println(regData);
            Long socialId = pathSocialId;
//            String tag = regData.get("name");
//            String userEmail = regData.get("userEmail");
//            result = hashTagService.regTag(socialId, tag, userEmail);
        }
        if (result) {
            return new ResponseEntity<>(true, HttpStatus.OK);  // 프론트의 res.data 값(true)으로 넘어감
        } else {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    //    @PostMapping
//    public ResponseEntity<Boolean> hashtagSave(@RequestBody HashTagDTO hashTagDTO) {
//        System.out.println(hashTagDTO.toString());
//        List<Entity> entity = new ArrayList<>();
//        for (HashTag hashTag2 : hashTagDTO) {
//            hashTag  : new HashTag();
//            entity.set()hashdto.getEmail("email");
//
//            entity.add(hashTag2);
//            System.out.println(product.toString());
//        }
    // 해시태그 삭제
    @PostMapping("/hashtag/delete")
    public ResponseEntity<Boolean> tagDelete(@RequestBody Map<String, Long> regData) throws Exception {
        log.warn(regData.toString());
        Long id = regData.get("tagId");
        System.out.println(id);
        if (hashTagService.delTag(id) > 0) { // 삭제 성공하면 1이 return 되므로
            return new ResponseEntity<>(true, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }
}
