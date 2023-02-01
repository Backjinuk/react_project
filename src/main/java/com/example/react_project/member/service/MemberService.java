package com.example.react_project.member.service;


import com.example.react_project.domain.Member;

public interface MemberService {
    void addMember(Member member);
    String SearchMember(Member member);

    String getLoginCheck(Member member);
}
