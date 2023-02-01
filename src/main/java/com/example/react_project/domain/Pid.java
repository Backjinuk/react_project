package com.example.react_project.domain;

import lombok.Data;
import lombok.ToString;

import java.sql.Date;
import java.util.List;

@Data
@ToString
public class Pid {

    private int pidNum;
    private String userId;
    private String pidTitle;
    private String pidTag;
    private int likeCount;
    private Date regDate;
    private String likeCheck;
    private List<Comment> commentList;
    private List<File> fileList;

}
