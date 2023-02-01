package com.example.react_project.member.controller;

import com.example.react_project.domain.Member;
import com.example.react_project.member.MemberMapper;
import com.example.react_project.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;


@RestController
@RequestMapping("/member/*")
public class MemberController {

    @Autowired
    private MemberService memberService;


    @RequestMapping("addMember")
    public String addMamber(@RequestBody Member member) {

        memberService.addMember(member);

        return null;
    }

    @RequestMapping("searchMember")
    public String searchMember(@RequestBody Member member) {

        return memberService.SearchMember(member);

    }

    @RequestMapping("login")
    public String login(@RequestBody Member member,
                        HttpSession session) {

        String loginCheck = memberService.getLoginCheck(member);

        if (loginCheck.equals("y")) {
            session.setAttribute("userId", member.getId());
        }

        return loginCheck;
    }

    @RequestMapping("loginCheck")
    public String loginCheck(HttpSession session) {

        if (session.getAttribute("userId") != null){

            return (String)session.getAttribute("userId");
        }

        return "n";
    }

}
