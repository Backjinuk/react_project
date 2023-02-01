package com.example.react_project.pid;

import com.example.react_project.domain.Comment;
import com.example.react_project.domain.File;
import com.example.react_project.domain.Like;
import com.example.react_project.domain.Pid;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
@Mapper
public interface PidMapper{

    void addPid(Pid pid);

    void uploadFile(Map<String, Object> map);

    List<Map<String, Object>> getPidList(String userId);

    List<File> getFileList(int pidNum);

    void addComment(Comment comment);

    List<Comment> getCommentList(int pidNum);

    String getLikeCheck(Like like);

    void addLike(Like like);

    void updatePidLike(Map<String, Object> likeMap);

    void updateLike(Like like);

    boolean updatePid(Pid pid);

    void updateFile(int fileNum);

    void deleteComment(Map<String,Object> map);

    boolean deletePid(int pidNum);

    boolean updateComment(Comment comment);

    void deleteLike(int pidNum);
}
