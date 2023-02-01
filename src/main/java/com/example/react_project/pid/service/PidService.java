package com.example.react_project.pid.service;

import com.example.react_project.domain.Comment;
import com.example.react_project.domain.File;
import com.example.react_project.domain.Like;
import com.example.react_project.domain.Pid;

import java.util.List;
import java.util.Map;

public interface PidService {

    void addPid(Pid pid);

    void uploadFile(int boardNum, String fileName);

    Map<String, Object> getPidList(String userId);

    void addComment(Comment comment);

    String getLikeCheck(Like like);

    void addLike(Like like);

    void updatePidLike(String likeCategory, int boardNum);

    void updateLike(Like like);

    boolean updatePid(Pid pid);

    List<File> getFileList(int pidNum);

    void updateFile(int fileNum);

    void deleteComment(int pidNum, int i);

    boolean deletePid(int pidNum);

    boolean updateComment(Comment comment);

    void deleteLike(int pidNum);
}
