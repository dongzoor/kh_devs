package com.kh.devs.entity;

import com.kh.devs.constant.ApplyStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@Table(name = "study_apply")
public class StudyApply {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "apply_id")
    private Long id;

    @Enumerated(EnumType.STRING)
    private ApplyStatus apply;

    @Column(name = "total_apply", nullable = false)
    private int totalApply;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}
