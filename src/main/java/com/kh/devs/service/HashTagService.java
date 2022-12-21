package com.kh.devs.service;

import com.kh.devs.dao.HashTagRepository;
import com.kh.devs.dao.SocialRepository;
import com.kh.devs.dao.UserRepository;
import com.kh.devs.entity.HashTag;
import com.kh.devs.entity.Social;
import com.kh.devs.entity.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
@Service
public class HashTagService {
    private final SocialRepository socialRepository;
    private final UserRepository userRepository;
    private final HashTagRepository hashTagRepository;

    // 작성
    public boolean regTag(Long socialId, String tag, String userEmail) throws Exception {
        try {
            User user = (userRepository.findByUserEmail(userEmail)).get(0);
            Long id = (socialId);
            Social social = (socialRepository.findBySocialId(id).get(0));
            HashTag hashTag = new HashTag();
            hashTag.setUser(user);
            hashTag.setSocial(social);
            hashTag.setTag(tag);
            HashTag rst = hashTagRepository.save(hashTag);
            log.warn(rst.toString());
            return true;
        } catch (Exception e) {
            throw new Exception(e);
        }
    }

    // 삭제
    @Transactional
    public int delTag(Long tagId) {
        HashTag hashTag = hashTagRepository.findById(tagId).get();
        if (!Objects.isNull(hashTag)) {
            hashTagRepository.deleteById(hashTag.getId());
            return 1;
        } else {
            return 0;
        }
    }
}
