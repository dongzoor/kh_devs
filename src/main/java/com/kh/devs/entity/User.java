package com.kh.devs.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.kh.devs.constant.UserRole;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDateTime;

import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Long userId;

    @Column(unique = true, nullable = false)
    private String userEmail;

    @Column(nullable = false)
    private String userNickname;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String phone;

    @Column(name = "profileImage")
    private String profileImage;

    @Column(name = "profileImagePath")
    private String profileImagePath;

    // default role은 user로 하고, admin 계정은 미리 서버에 넣어두는걸로 하기
    @Column(name = "userRole")
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createDate;

    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime modifyDate;


    // 회원 탈퇴 시 참조하고 있는 테이블의 데이터를 함께 지우기
    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Social> socials;

    @JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Study> studies;
}
