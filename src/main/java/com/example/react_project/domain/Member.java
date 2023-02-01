package com.example.react_project.domain;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class Member {
    private String id;
    private String password;
    private int phone;
    private String emile;
}
