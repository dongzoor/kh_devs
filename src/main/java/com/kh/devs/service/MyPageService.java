package com.kh.devs.service;

import com.kh.devs.dao.SocialRepository;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.entity.Social;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class MyPageService {

    private final SocialRepository socialRepository;

    // 작성글 전체 조회
    public List<SocialDTO> getSocialList(Long userId) {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> socialList = socialRepository.findAllByUserId(userId);
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
