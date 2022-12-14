package com.kh.devs.service;

import com.kh.devs.dao.StudyRepository;
import com.kh.devs.dto.StudyDTO;
import com.kh.devs.entity.Study;
import com.kh.devs.exception.NotFoundStudyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class StudyService {
    private final StudyRepository studyRepository;

    public Boolean writeStudy(StudyDTO studyDTO) {
        Study study = Study.builder()
                .title(studyDTO.getTitle())
                .content(studyDTO.getContent())
                .regTime(LocalDateTime.now())
                .goalTime(LocalDateTime.now())
                .cnt(0)
                .writer(studyDTO.getWriter())
                .imgUrl(studyDTO.getImgUrl())
                .build();
        Study rst = studyRepository.save(study);
        log.warn(rst.toString());
        return true;
    }
    public List<Study> getStudyList() {
        return studyRepository.findAll();
    }

    public Optional<Study> getStudy(Long id) {
        Study study = studyRepository.findById(id).orElseThrow(() -> new NotFoundStudyException("study is not Found!"));
        return Optional.ofNullable(study);
    }

    @Transactional
    public void updateStudy(Long id, StudyDTO studyDTO) {
        Study study = studyRepository.findById(id).orElseThrow(() -> new NotFoundStudyException("study is not Found!"));;
        if(!studyDTO.getTitle().equals("")) study.setTitle(studyDTO.getTitle()); // 제목이 바뀐 경우
        if(!studyDTO.getContent().equals("")) study.setContent(studyDTO.getContent()); // 내용이 바뀐 경우
        study.setImgUrl(studyDTO.getImgUrl());
        study.setUpdateTime(LocalDateTime.now());
    }

    public String deleteAdStudy(Long studyId) {
        studyRepository.deleteById(studyId); // 오류가 터지면 익센셥 타서 신경 노노
        return "OK";
    }

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



