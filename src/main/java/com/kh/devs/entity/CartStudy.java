package com.kh.devs.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter @Setter
@Table(name = "cart_study")
public class CartStudy {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column( name = "cart_study")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "study_id")
    private Study study;


    @ManyToOne(fetch = FetchType.LAZY) // 하나의 찜에는 여러 개의 스터디 담을 수 있으므로 many to one 이다.
    @JoinColumn(name = "cart_id")
    private Cart cart;


}
