package com.example.reactproject.domain;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class member {
    private String id;
    private String password;
    private int phone;
    private String emile;
}
