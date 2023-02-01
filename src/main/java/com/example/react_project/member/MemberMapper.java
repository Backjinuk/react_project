package com.example.react_project.member;

import com.example.react_project.domain.Member;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Mapper
@Repository
public interface MemberMapper {

    void addMember(Member member);
    List<Map<String,Object>> SearchMember(Member member);

    List<Map<String, Object>> getLoginCheck(Member member);
}
