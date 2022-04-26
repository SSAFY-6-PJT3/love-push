package com.cupid.joalarm.accout.service;

import com.cupid.joalarm.accout.entity.Account;
import com.cupid.joalarm.accout.repository.AccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component("userDetailsService")
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    // UserDetailsService 는 loginProcessingUrl(”/login”) 요청이 오면 자동으로 UserDetailsService 타입으로 되어 있는 loadUserByUsername 함수가 실행
    // SecurityConfig 에서 formLogin().disable() 설정
    // 로그인 url("/login") 에서 동작 안함.
    // 직접 filter 구현
    private final AccountRepository accountRepository;

    @Override
    public UserDetails loadUserByUsername(String seq) throws UsernameNotFoundException {
        System.out.println("loadUserByUsername");
        Optional<Account> a =accountRepository.findAccountByAccountSeq(Long.parseLong(seq));
//        System.out.println("account"+ a.get());
//        UserDetails u =accountRepository.findOneById(id)
//                .map(account -> createUser(account))
//                .orElseThrow(() -> new UsernameNotFoundException(id + " -> 데이터베이스에서 찾을 수 없습니다."));
//        System.out.println("userdetails "+u);
        return accountRepository.findAccountByAccountSeq(Long.parseLong(seq))
                .map(account -> createUser(account))
                .orElseThrow(() -> new UsernameNotFoundException(seq + " -> 데이터베이스에서 찾을 수 없습니다."));
    }

    private User createUser(Account account) {
        List<GrantedAuthority> grantedAuthorities = new ArrayList<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        return new User(account.getAccountSeq().toString(), account.getPassword(),grantedAuthorities);
    }
}
