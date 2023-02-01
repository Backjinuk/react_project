package com.example.react_project.member.service.Impl;
import com.example.react_project.domain.Member;
import com.example.react_project.member.MemberMapper;
import com.example.react_project.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@SpringBootApplication(scanBasePackages = {"com.example.react_project.member"})
public class MemberServiceImpl implements MemberService {


    @Autowired
    private MemberMapper memberMapper;

    @Override
    public void addMember(Member member) {
        memberMapper.addMember(member);

    }
    @Override
    public String SearchMember(Member member) {

        System.out.println("=============== " + member.getId() );

        List<Map<String,Object>> loginCheck =  memberMapper.SearchMember(member);

        if (loginCheck.size() > 0){

            return "y";
        }
        return "n";
    }

    @Override
    public String getLoginCheck(Member member) {

        List<Map<String,Object>> loginCheck =  memberMapper.getLoginCheck(member);

        if (loginCheck.size() > 0){
            return "y";
        }
        return "n";
    }
}
