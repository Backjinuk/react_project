package com.example.react_project.domain;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Like {
    private int likeNum;
    private String userId;
    private int boardNum;
    private String likeCheck;
    private String boardCategory;
}
