package com.kh.devs.service;

import com.kh.devs.dao.SocialRepository;
import com.kh.devs.dao.UserRepository;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.entity.Social;
import com.kh.devs.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

// Service 의 역할은 DAO(Repository)가 DB 에서 받아온 데이터를 전달받아 가공하는 것
@Slf4j
@RequiredArgsConstructor
@Service
public class SocialService {
    @Autowired
    private final SocialRepository socialRepository;
    @Autowired
    private final UserRepository userRepository;

    // Social 전체 조회
    public List<SocialDTO> getSocialList() {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> socialList = socialRepository.findAll(Sort.by(Sort.Direction.DESC, "postDate")); // 레파지토리에 정보 요청해서 해당 DB정보가 그대로 Entity에 들어옴
        // for(배열요소이름 변수명 : 배열이름)
        for (Social e : socialList) {
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setSocialId(e.getSocialId());
            socialDTO.setUser(e.getUser().getUserNickname()); // 작성자 닉네임
            socialDTO.setTitle(e.getTitle());
            socialDTO.setContent(e.getContent());
            socialDTO.setTag(e.getTag());
            socialDTO.setPostDate(e.getPostDate());
            socialDTO.setImage(e.getImage());
            socialDTO.setLike(e.getLike());
            socialDTO.setComment(e.getComment());
            socialDTO.setView(e.getView());
            socialDTOS.add(socialDTO);
        }
        return socialDTOS;
    }
    // Social 상세 조회
    public SocialDTO getSocialList(Long socialId) {
//        Social social = socialRepository.findBySocialId(socialId);
        Social social = socialRepository.findById(socialId).get();
        SocialDTO socialDTO = new SocialDTO();
        socialDTO.setSocialId(social.getSocialId());    // 게시글 id
        socialDTO.setUser(social.getUser().getUserNickname());   // 작성자 닉네임
        socialDTO.setTitle(social.getTitle());
        socialDTO.setContent(social.getContent());
        socialDTO.setTag(social.getTag());
        socialDTO.setLike(social.getLike());
        socialDTO.setImage(social.getImage());
        socialDTO.setImageId(social.getImageId());
        socialDTO.setView(social.getView());
        socialDTO.setComment(social.getComment());
        socialDTO.setPostDate(social.getPostDate());
        log.warn(socialDTO.toString()); // 터미널 창에 찍으려구
        System.out.println(socialDTO);
        return socialDTO;
    }
    // Social Write 등록
    public boolean regSocial(Long userId, String title, String content, String tag, String image, String imageId) throws Exception { // 결과값은 성공,실패만 알려주면 되니까 boolean
        try{
            User user = userRepository.findById(userId).get(); // 객체로 user 정보를 다시 찾아와서 넣어주기 위함
            System.out.println("#############################");
            System.out.println(user);
            System.out.println("#############################");
            Social social = new Social();
            social.setUser(user);
            social.setTitle(title);
            social.setTag(tag);
            social.setContent(content);
            social.setImage(image);
            social.setImageId(imageId);
            social.setPostDate(LocalDateTime.now());  // 게시일 정보 자동 기입
            Social rst = socialRepository.save(social);
            log.warn(rst.toString()); // 터미널 창에 찍으려구
            return true;
        }catch (Exception e) {
            throw new Exception(e);
        }
    }
    @Transactional  // 수정
    public boolean updateSocial(Long socialId,String title, String content, String tag, String image, String imageId) {
        Social social = socialRepository.findById(socialId)
                .orElseThrow(()->{
                    return new IllegalArgumentException("글 찾기 실패: 아이디를 찾을 수 없습니다.");
                });
        social.setTitle(title);
        social.setTag(tag);
        social.setContent(content);
        social.setImage(image);
        social.setImageId(imageId);
        social.setUpDate(LocalDateTime.now());  // 수정일 정보 자동 기입
        return true;
    }
    @Transactional // 삭제
    public int delSocial(Long socialId) {
        Social social = socialRepository.findById(socialId).get();
        if (!Objects.isNull(social)) {
            socialRepository.deleteById(social.getSocialId());
            return 1;
        }else {
            return 0;
        }
    }
//    @Transactional
//    public List<Social> getAdSocialList() {
//        return socialRepository.findAll();
//    }
//
    @Transactional
    public String deleteSocial(Long socialId) {
        socialRepository.deleteById(socialId); // 오류가 터지면 익센셥 타서 신경 노노
        return "ok";
    }


}
