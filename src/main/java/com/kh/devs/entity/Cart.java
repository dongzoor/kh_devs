package com.kh.devs.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Cart {
    @Id
    @Column(name = "cart_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn( name = "study_id")
    private Study study;
}
