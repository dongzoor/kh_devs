package com.kh.devs.config;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

//스프링 시큐리티가 제공해주는 설정들을 사용하기 위해서는 WebSecurityConfigurerAdapter를 상속받아 configure메서드를 재정의
@Configuration
@AllArgsConstructor
@EnableWebSecurity // spring security 설정을 활성화시켜주는 어노테이션
public class SequrityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {


        http.csrf()
                .ignoringAntMatchers("/**") // 인증토큰 비활성화
                .and().formLogin()                     // form기반의 로그인인 경우
                .loginPage("/")                        // 인증이 필요한 URL에 접근하면 /으로 이동
                .and()
                .logout()                    // logout할 경우
                .logoutUrl("/")            // 로그아웃을 처리할 URL 입력
                .logoutSuccessUrl("/");
    }
    @Bean
    public CorsConfigurationSource corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);   //내 서버가 응답할 때 json을 자바스크립트에서 처리할 수 있게 할지 설정. false이면 자바스크립트에서 서버로 요청했을떄 응답해줄수 없다
        config.addAllowedOrigin("*");       //모든 ip의 응답을 허용하겠다
        config.addAllowedHeader("*");       //모든 헤더의 응답을 허용하겠다
        config.addAllowedMethod("*");       //모든 http메서드(get, post, put, delete, patch)의 응답을 허용하겠다
        config.setMaxAge(3600L);

        source.registerCorsConfiguration("/**", config);
        return source;
    }

}
