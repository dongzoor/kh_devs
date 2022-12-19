package com.kh.devs.service;

import com.kh.devs.dao.CommentRepository;
import com.kh.devs.dao.MySocialRepository;
import com.kh.devs.dao.SocialRepository;
import com.kh.devs.dao.StudyRepository;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Social;
import com.kh.devs.entity.Study;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyPageService {

    private final MySocialRepository mySocialRepository;
    private final UserService userService;
    private final SocialRepository socialRepository;
    private final CommentRepository commentRepository;
    private final StudyRepository studyRepository;

    // 작성글 전체 조회
    public List<SocialDTO> getSocialList(Long userId) {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> socialList = mySocialRepository.findAllByUserId(userId);
        for (Social e : socialList) {
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setSocialId(e.getSocialId());
            socialDTO.setTitle(e.getTitle());
            socialDTO.setPostDate(e.getPostDate());
            socialDTO.setComment(e.getComment());
            socialDTO.setView(e.getView());
            socialDTOS.add(socialDTO);
        }
        return socialDTOS;
    }


}
