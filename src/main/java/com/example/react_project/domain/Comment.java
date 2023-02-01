package com.example.react_project.domain;

import lombok.Data;
import lombok.ToString;

import java.sql.Date;
import java.util.List;

@Data
@ToString
public class Comment {
    private int commentNum;
    private int boardNum;
    private String userId;
    private String commentText;
    private int likeCount;
    private Date regDate;

}
