package com.kh.devs.controller;

import com.kh.devs.dao.StudyRepository;
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

        // 조회수 업데이트
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
//        로그인 파트에서 세션으로 주면 받아올 예정
        studyService.updateStudy(studyId, studyDTO);

//        return "redirect:/study/" + studyId;
    }

    @PutMapping("/study/{studyId}")  // 스터디 신청5
    public void applyStudy(@PathVariable Long studyId, @RequestBody StudyDTO studyDTO) {
//        로그인 파트에서 세션으로 주면 받아올 예정
        studyService.applyStudy(studyId, studyDTO);

//        return "redirect:/study/" + studyId;
    }
//    @GetMapping("/study/edit/{studyId}")
//    public ResponseEntity<Study> getUpdateStudy(@PathVariable Long studyId) {
//        Optional<Study> study = studyService.getStudy(studyId);
//        return new ResponseEntity(study, HttpStatus.OK);
//    }


    @DeleteMapping("study/{studyId}")
    public void deleteStudy(@PathVariable Long studyId) {
        studyRepository.deleteById(studyId);
    }


    // hashtag 검색
    @GetMapping("/study/hashtag/{tag}")
    public ResponseEntity<List<StudyDTO>> searchHashtag(@PathVariable("tag") String tag) {
        List<StudyDTO> studyDTO = studyService.searchHashtag(tag);
        return new ResponseEntity<>(studyDTO, HttpStatus.OK);
    }
}
