package com.kh.devs.service;

import com.kh.devs.dao.CommentRepository;
import com.kh.devs.dao.SocialRepository;
import com.kh.devs.dao.UserRepository;
import com.kh.devs.dto.CommentDTO;
import com.kh.devs.dto.SocialDTO;
import com.kh.devs.dto.UserDTO;
import com.kh.devs.entity.Comment;
import com.kh.devs.entity.Social;
import com.kh.devs.entity.User;
import com.kh.devs.exception.NotFoundStudyException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class SocialService {
    private final SocialRepository socialRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public void updateCnt(Long id) {   //스터디 지원
        Social social = socialRepository.findById(id).orElseThrow(() -> new NotFoundStudyException("social is not Found!"));
        social.setView(social.getView() + 1);
        socialRepository.save(social);
    }

    // [해시태그] 검색
    public List<SocialDTO> searchHashtag(String tag) {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> social = socialRepository.findByHashtag(tag);
        // for(배열요소이름 변수명 : 배열이름)
        for (Social e : social) {
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setSocialId(e.getSocialId());
            socialDTO.setUserEmail(e.getUser().getUserEmail());             // 작성자 이메일
            socialDTO.setUserNickName(e.getUser().getUserNickname());       // 작성자 닉네임
            socialDTO.setUserImageId(e.getUser().getProfileImage());        // 작성자 사진 ID
            socialDTO.setUserImageUrl(e.getUser().getProfileImagePath());   // 작성자 사진 URL
            socialDTO.setTitle(e.getTitle());
            socialDTO.setContent(e.getContent());
            socialDTO.setPostDate(e.getPostDate());
            socialDTO.setImage(e.getImage());
            socialDTO.setLike(e.getLike());
            socialDTO.setView(e.getView());
            socialDTO.setHashtag(e.getHashtag());
            socialDTOS.add(socialDTO);
            // 댓글 list 조회
            List<Comment> list = commentRepository.findBySocial_SocialIdOrderByPostDateDesc(socialDTO.getSocialId());
            List<CommentDTO> CommentDTOs = new ArrayList<>();
            for (Comment c : list) {
                CommentDTO commentDTO = new CommentDTO();
                commentDTO.setId(c.getId());
                commentDTO.setContent(c.getContent());
                commentDTO.setPostDate(c.getPostDate());
                commentDTO.setUserId(c.getUser().getUserId());
                commentDTO.setUserNickName(c.getUser().getUserNickname());
                commentDTO.setUserImageUrl(c.getUser().getProfileImagePath());
                CommentDTOs.add(commentDTO);    // CommentDTOs list에 값을 담는다
            }
            socialDTO.setComments(CommentDTOs); // 모든 댓글 list 값을 socialDTO에 담기
        }
        return socialDTOS;
    }

    // [제목+내용] 검색
    public List<SocialDTO> searchTorC(String TorC) {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> social = socialRepository.findByTitleOrContent(TorC);
        // for(배열요소이름 변수명 : 배열이름)
        for (Social e : social) {
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setSocialId(e.getSocialId());
            socialDTO.setUserEmail(e.getUser().getUserEmail());             // 작성자 이메일
            socialDTO.setUserNickName(e.getUser().getUserNickname());       // 작성자 닉네임
            socialDTO.setUserImageId(e.getUser().getProfileImage());        // 작성자 사진 ID
            socialDTO.setUserImageUrl(e.getUser().getProfileImagePath());   // 작성자 사진 URL
            socialDTO.setTitle(e.getTitle());
            socialDTO.setContent(e.getContent());
            socialDTO.setPostDate(e.getPostDate());
            socialDTO.setImage(e.getImage());
            socialDTO.setLike(e.getLike());
            socialDTO.setView(e.getView());
            socialDTO.setHashtag(e.getHashtag());
            socialDTOS.add(socialDTO);
            // 댓글 list 조회
            List<Comment> list = commentRepository.findBySocial_SocialIdOrderByPostDateDesc(socialDTO.getSocialId());
            List<CommentDTO> CommentDTOs = new ArrayList<>();
            for (Comment c : list) {
                CommentDTO commentDTO = new CommentDTO();
                commentDTO.setId(c.getId());
                commentDTO.setContent(c.getContent());
                commentDTO.setPostDate(c.getPostDate());
                commentDTO.setUserId(c.getUser().getUserId());
                commentDTO.setUserNickName(c.getUser().getUserNickname());
                commentDTO.setUserImageUrl(c.getUser().getProfileImagePath());
                CommentDTOs.add(commentDTO);    // CommentDTOs list에 값을 담는다
            }
            socialDTO.setComments(CommentDTOs); // 모든 댓글 list 값을 socialDTO에 담기
        }
        return socialDTOS;
    }

    // [닉네임] 검색
    public List<SocialDTO> searchNickname(String nickname) {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<User> users = userRepository.findByUserNicknameLike(nickname);
        for (User u : users) {
            UserDTO userDTOS = new UserDTO();
            userDTOS.setUserId(u.getUserId());
            List<Social> socialList = socialRepository.findAllByUserId(userDTOS.getUserId());
            for (Social e : socialList) {
                SocialDTO socialDTO = new SocialDTO();
                socialDTO.setSocialId(e.getSocialId());
                socialDTO.setUserEmail(e.getUser().getUserEmail());             // 작성자 이메일
                socialDTO.setUserNickName(e.getUser().getUserNickname());       // 작성자 닉네임
                socialDTO.setUserImageId(e.getUser().getProfileImage());        // 작성자 사진 ID
                socialDTO.setUserImageUrl(e.getUser().getProfileImagePath());   // 작성자 사진 URL
                socialDTO.setTitle(e.getTitle());
                socialDTO.setContent(e.getContent());
                socialDTO.setPostDate(e.getPostDate());
                socialDTO.setImage(e.getImage());
                socialDTO.setLike(e.getLike());
                socialDTO.setView(e.getView());
                socialDTO.setHashtag(e.getHashtag());
                socialDTOS.add(socialDTO);
                // 댓글 list 조회
                List<Comment> list = commentRepository.findBySocial_SocialIdOrderByPostDateDesc(socialDTO.getSocialId());
                List<CommentDTO> CommentDTOs = new ArrayList<>();
                for (Comment c : list) {
                    CommentDTO commentDTO = new CommentDTO();
                    commentDTO.setId(c.getId());
                    commentDTO.setContent(c.getContent());
                    commentDTO.setPostDate(c.getPostDate());
                    commentDTO.setUserId(c.getUser().getUserId());
                    commentDTO.setUserNickName(c.getUser().getUserNickname());
                    commentDTO.setUserImageUrl(c.getUser().getProfileImagePath());
                    CommentDTOs.add(commentDTO);    // CommentDTOs list에 값을 담는다
                }
                socialDTO.setComments(CommentDTOs); // 모든 댓글 list 값을 socialDTO에 담기
            }
        }
        return socialDTOS;
    }

    // Social 전체 조회
    public List<SocialDTO> getSocialList() {
        List<SocialDTO> socialDTOS = new ArrayList<>();
        List<Social> socialList = socialRepository.findAll(Sort.by(Sort.Direction.DESC, "postDate")); // 레파지토리에 정보 요청해서 해당 DB정보가 그대로 Entity에 들어옴
        // for(배열요소이름 변수명 : 배열이름)
        for (Social e : socialList) {
            SocialDTO socialDTO = new SocialDTO();
            socialDTO.setSocialId(e.getSocialId());
            socialDTO.setUserEmail(e.getUser().getUserEmail());             // 작성자 이메일
            socialDTO.setUserNickName(e.getUser().getUserNickname());       // 작성자 닉네임
            socialDTO.setUserImageId(e.getUser().getProfileImage());        // 작성자 사진 ID
            socialDTO.setUserImageUrl(e.getUser().getProfileImagePath());   // 작성자 사진 URL
            socialDTO.setTitle(e.getTitle());
            socialDTO.setContent(e.getContent());
            socialDTO.setPostDate(e.getPostDate());
            socialDTO.setImage(e.getImage());
            socialDTO.setLike(e.getLike());
            socialDTO.setView(e.getView());
            socialDTO.setHashtag(e.getHashtag());
            socialDTOS.add(socialDTO);
            // 댓글 list 조회
            List<Comment> list = commentRepository.findBySocial_SocialIdOrderByPostDateDesc(socialDTO.getSocialId());
            List<CommentDTO> CommentDTOs = new ArrayList<>();
            for (Comment c : list) {
                CommentDTO commentDTO = new CommentDTO();
                commentDTO.setId(c.getId());
                commentDTO.setContent(c.getContent());
                commentDTO.setPostDate(c.getPostDate());
                commentDTO.setUserId(c.getUser().getUserId());
                commentDTO.setUserNickName(c.getUser().getUserNickname());
                commentDTO.setUserImageUrl(c.getUser().getProfileImagePath());
                CommentDTOs.add(commentDTO);    // CommentDTOs list에 값을 담는다
            }
            socialDTO.setComments(CommentDTOs); // 모든 댓글 list 값을 socialDTO에 담기
        }
        return socialDTOS;
    }

    // Social 상세 조회
    public SocialDTO getSocialList(Long socialId) {
        Social social = socialRepository.findById(socialId).get();
        SocialDTO socialDTO = new SocialDTO();
        socialDTO.setSocialId(social.getSocialId()); // 게시글 id
        socialDTO.setUserEmail(social.getUser().getUserEmail());            // 작성자 이메일
        socialDTO.setUserNickName(social.getUser().getUserNickname());      // 작성자 닉네임
        socialDTO.setUserImageId(social.getUser().getProfileImage());       // 작성자 사진 ID
        socialDTO.setUserImageUrl(social.getUser().getProfileImagePath());  // 작성자 사진 URL
        socialDTO.setTitle(social.getTitle());
        socialDTO.setContent(social.getContent());
        socialDTO.setHashtag(social.getHashtag());
        socialDTO.setLike(social.getLike());
        socialDTO.setImage(social.getImage());
        socialDTO.setImageId(social.getImageId());
        socialDTO.setView(social.getView());
        socialDTO.setPostDate(social.getPostDate());

        // 댓글 list 조회
        List<Comment> list = commentRepository.findBySocial_SocialIdOrderByPostDateDesc(socialId);
        List<CommentDTO> CommentDTOs = new ArrayList<>();
        for (Comment e : list) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(e.getId());
            commentDTO.setContent(e.getContent());
            commentDTO.setPostDate(e.getPostDate());
            commentDTO.setUserId(e.getUser().getUserId());
            commentDTO.setUserNickName(e.getUser().getUserNickname());
            commentDTO.setUserImageUrl(e.getUser().getProfileImagePath());
            CommentDTOs.add(commentDTO);    // CommentDTOs list에 값을 담는다
        }
        socialDTO.setComments(CommentDTOs); // 모든 댓글 list 값을 socialDTO에 담기
        return socialDTO;
    }


    // Social Write 등록
    public Map<String, Object> regSocial(String userEmail, String title, String content, List<String> hashtag, String image, String imageId) throws Exception { // 결과값은 성공,실패만 알려주면 되니까 boolean
        Map<String, Object> response = new HashMap<>();
        try {
            User user = (userRepository.findByUserEmail(userEmail)).get(0); // 객체로 user 정보를 다시 찾아와서 넣어주기 위함
            Social social = new Social();
            social.setUser(user);
            social.setTitle(title);
            social.setContent(content);
            social.setImage(image);
            social.setImageId(imageId);
            social.setHashtag(hashtag);
            social.setPostDate(LocalDateTime.now());  // 게시일 정보 자동 기입
            Social rst = socialRepository.save(social);
            Long socialIdData = rst.getSocialId();  // 게시글 ID 받아옴
            System.out.println(socialIdData);
            response.put("result", "true");
            response.put("socialId", socialIdData); // 받아온 게시글 ID를 넘겨줌
            return response;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    @Transactional  // 수정
    public boolean updateSocial(Long socialId, String title, String content, List<String> hashtag, String image, String imageId) {
        Social social = socialRepository.findById(socialId)
                .orElseThrow(() -> {
                    return new IllegalArgumentException("글 찾기 실패: 아이디를 찾을 수 없습니다.");
                });
        social.setTitle(title);
        social.setContent(content);
        social.setHashtag(hashtag);
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
        } else {
            return 0;
        }
    }

    // JW admin service
    @Transactional
    public String deleteSocial(Long socialId) {
        socialRepository.deleteById(socialId); // 오류가 터지면 익센셥 타서 신경 노노
        return "ok";
    }

    public List<Social> getAdSocialList2() {
        return socialRepository.findAll();
    }

    //마이페이지 작성글 전체 삭제용
    @Transactional
    public String allDeleteMySocial(Long userId) {
        socialRepository.deleteById(userId); // 오류가 터지면 익센셥 타서 신경 노노
        return "ok";
    }
}
