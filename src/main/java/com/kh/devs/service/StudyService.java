package com.kh.devs.service;

import com.fasterxml.jackson.annotation.JsonSetter;
import com.kh.devs.constant.ApplyStatus;
import com.kh.devs.dao.StudyRepository;
import com.kh.devs.dao.UserRepository;
import com.kh.devs.dto.StudyDTO;
import com.kh.devs.entity.Study;
import com.kh.devs.entity.User;
import com.kh.devs.exception.NotFoundStudyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;
    private final UserRepository userRepository;

    public Boolean writeStudy(StudyDTO studyDTO) {
        User user = userRepository.findByUserId(Long.parseLong(studyDTO.getUserId())).get(0);
        Study study = Study.builder()
                .user(user)
                .title(studyDTO.getTitle())
                .content(studyDTO.getContent())
                .regTime(LocalDateTime.now())
                .goalTime(studyDTO.getGoalTime())
                .cnt(0)
                .imgUrl(studyDTO.getImgUrl())
                .hashtag(studyDTO.getHashtag())
                .addr(studyDTO.getAddr())
                .goalPeople(studyDTO.getGoalPeople())
                .applyStatus(ApplyStatus.ING)
                .studyApplyCount(1)
                .applyPeople(studyDTO.getApplyPeople())
                .build();
        Study rst = studyRepository.save(study);
        log.warn(rst.toString());
        return true;
    }
    public List<Study> getStudyList() {
        return studyRepository.findAll();
    }

    @JsonSetter
    public Study getStudy(Long id) {
//        Study study = studyRepository.findById(id).get();
//        StudyDTO studyDTO = new StudyDTO();
//        studyDTO.setStudyId(study.getId());
//        studyDTO.setWriter(study.getWriter());
//        studyDTO.setTitle((study.getTitle()));
//        studyDTO.setContent(study.getContent());
//        studyDTO.setImgUrl(study.getImgUrl());
//        if(study.getApplyStatus() == ApplyStatus.ING) studyDTO.setStudyApply(true);
//        else studyDTO.setStudyApply(false);
//        studyDTO.setReadCount(study.getCnt());
//        log.warn(studyDTO.toString());
//        Study study = studyRepository.findById(id).orElseThrow(() -> new NotFoundStudyException("study is not Found!"));

        Study study = studyRepository.findById(id).get();


        return study;
    }

    @Transactional
    public void updateStudy(Long id, StudyDTO studyDTO) {
        Study study = studyRepository.findById(id).orElseThrow(() -> new NotFoundStudyException("study is not Found!"));
        if(!studyDTO.getTitle().equals("")) study.setTitle(studyDTO.getTitle()); // 제목이 바뀐 경우
        if(!studyDTO.getContent().equals("")) study.setContent(studyDTO.getContent()); // 내용이 바뀐 경우
        if(!studyDTO.getHashtag().isEmpty()) study.setHashtag(studyDTO.getHashtag()); // 해시태그가 바뀐 경우
        if(studyDTO.getGoalPeople() != 0) study.setGoalPeople(studyDTO.getGoalPeople()); // 목표 인원이 바뀐 경우
        study.setApplyPeople(studyDTO.getApplyPeople()); // 모집 배열이 바뀐 경우
        study.setAddr(studyDTO.getAddr());
        study.setGoalTime(studyDTO.getGoalTime());
        study.setImgUrl(studyDTO.getImgUrl());
        study.setUpdateTime(LocalDateTime.now());
    }

    public String deleteAdStudy(Long studyId) {
        studyRepository.deleteById(studyId); // 오류가 터지면 익센셥 타서 신경 노노
        return "OK";
    }

    @Transactional
    public void applyStudy(Long id, StudyDTO studyDTO) {   //스터디 지원
        Study study = studyRepository.findById(id).orElseThrow(() -> new NotFoundStudyException("study is not Found!"));
        study.setApplyPeople(studyDTO.getApplyPeople());
        study.setStudyApplyCount(studyDTO.getApplyCnt());
    }

    // hashtag 검색
    public List<StudyDTO> searchHashtag(String tag) {
        List<StudyDTO> studyDTOS = new ArrayList<>();
        List<Study> study = studyRepository.findByHashtag(tag);
        // for(배열요소이름 변수명 : 배열이름)
        for (Study e : study) {
            StudyDTO studyDTO = new StudyDTO();
            studyDTO.setStudyId(e.getId());
            studyDTO.setTitle(e.getTitle());
            studyDTO.setContent(e.getContent());
            studyDTO.setImgUrl(e.getImgUrl());
            studyDTO.setAddr(e.getAddr());
            studyDTO.setHashtag(e.getHashtag());
            studyDTO.setGoalPeople(e.getGoalPeople());
            studyDTO.setApplyPeople(e.getApplyPeople());
            studyDTO.setReadCount(e.getCnt());
            log.warn(studyDTO.toString());

            studyDTOS.add(studyDTO);
        }
        return studyDTOS;
    }



//    @Transactional
//    public Long save(Long userId, StudyDTO studyDTO) {
//        Study saveStudy = StudyRepository.save();
//    }

//    public List<StudyDTO> getStudyList(){
//        List<StudyDTO> studyDTOS = new ArrayList<>();
//        List<Study> studyList = studyRepository.findAll();
//        for(Study e: studyList) {
//            StudyDTO studyDTO = new StudyDTO();
//            studyDTO.setName(e.getUser().getName());
//            studyDTO.setTitle(e.getTitle());
//            studyDTO.setContent(e.getContent());
//            studyDTO.setRegTime(LocalDateTime.now());
//            studyDTOS.add(studyDTO);
//        }
//        return studyDTOS;
//    }

//    public StudyDTO getStudy(Long id) {
//        StudyDTO studyDTO = new StudyDTO();
//        Study study = studyRepository.findById(id).orElse(null);
//        assert study != null;
//        studyDTO.setName(study.getUser().getName());
//        studyDTO.setTitle(study.getTitle());
//        studyDTO.setContent(study.getContent());
//        studyDTO.setRegTime(LocalDateTime.now());
//
//        return studyDTO;
//    }

}



