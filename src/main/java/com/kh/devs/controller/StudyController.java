package com.kh.devs.controller;

import com.kh.devs.dao.StudyRepository;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.dto.StudyDTO;
import com.kh.devs.entity.Study;
import com.kh.devs.service.StudyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class StudyController {

    private final StudyService studyService;
    private final StudyRepository studyRepository;

    @GetMapping("/studies")
    public ResponseEntity<List<Study>> studyList(){
        List<Study> list = studyService.getStudyList();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/study/{studyId}")
    public ResponseEntity<StudyDTO> studyDTO(@PathVariable Long studyId) {
        Study study = studyService.getStudy(studyId);

        // J2 조회수 업데이트
        if (study != null) {
            studyService.updateCnt(studyId);
        }
        Study studyDb = studyService.getStudy(studyId);

        return new ResponseEntity(studyDb, HttpStatus.OK);
    }

    @PostMapping("/study/write")
    public ResponseEntity<StudyDTO> writeStudy(@RequestBody StudyDTO studyDTO) {
//        로그인 파트에서 세션으로 주면 받아올 예정
        System.out.println(studyDTO);
        boolean result = studyService.writeStudy(studyDTO);

//        if(studyService.writeStudy(studyDTO) && )

        if (result) {
            return new ResponseEntity(true, HttpStatus.OK);
        } else {
            return new ResponseEntity(false, HttpStatus.BAD_REQUEST);
        }

    }

    @PutMapping("/study/edit/{studyId}")
    public void updateStudy(@PathVariable Long studyId, @RequestBody StudyDTO studyDTO) {
        studyService.updateStudy(studyId, studyDTO);
    }

    @PutMapping("/study/{studyId}")  // 스터디 신청
    public void applyStudy(@PathVariable Long studyId, @RequestBody StudyDTO studyDTO) {
        studyService.applyStudy(studyId, studyDTO);

    }

    @DeleteMapping("/study/{studyId}")
    public void deleteStudy(@PathVariable Long studyId) {
        studyRepository.deleteById(studyId);
    }

    // hashtag 검색
    @GetMapping("/studies/hashtag/{tag}")
    public ResponseEntity<List<Study>> searchHashtag(@PathVariable("tag") String tag) {
        List<Study> studyDTO = studyService.searchHashtag(tag);
        return new ResponseEntity<>(studyDTO, HttpStatus.OK);
    }

    // [제목+내용] 검색
    @GetMapping("/studies/titleContent/{tc}")
    public ResponseEntity<List<Study>> searchTorC(@PathVariable("tc") String tc) {
        List<Study> studyDTO = studyService.searchTorC(tc);
        return new ResponseEntity<>(studyDTO, HttpStatus.OK);
    }

    // [작성자 닉네임] 검색
//    @GetMapping("/studies/nickname/{nickname}")
//    public ResponseEntity<List<StudyDTO>> searchNickname(@PathVariable("nickname") String nickname) {
//        List<StudyDTO> studyDTO = studyService.searchNickname(nickname);
//        return new ResponseEntity<>(studyDTO, HttpStatus.OK);
//    }
}
