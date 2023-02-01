package com.example.react_project.pid.service.Impl;

import com.example.react_project.domain.Comment;
import com.example.react_project.domain.File;
import com.example.react_project.domain.Like;
import com.example.react_project.domain.Pid;
import com.example.react_project.pid.PidMapper;
import com.example.react_project.pid.service.PidService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PidServiceImpl implements PidService {


    @Autowired
    private PidMapper pidMapper;

    @Override
    public void addPid(Pid pid) {
        pidMapper.addPid(pid);
    }

    @Override
    public void uploadFile(int boardNum, String fileName) {
        Map<String,Object> map = new HashMap<String, Object>();

        map.put("boardNum", boardNum);
        map.put("fileName", fileName);

        pidMapper.uploadFile(map);
    }

    @Override
    public Map<String, Object> getPidList(String userId) {
        Pid pid = new Pid();
        List<Object> pidList = new ArrayList<>();
        Map<String,Object> map =  new HashMap<>();;

        List<Map<String,Object>> list = pidMapper.getPidList(userId);

        for (int i = 0; i <list.size(); i++) {


            pid = (Pid)list.get(i);

            pid.setFileList(pidMapper.getFileList(pid.getPidNum()));
            pid.setCommentList(pidMapper.getCommentList(pid.getPidNum()));

            pidList.add(pid);
        }

        map.put("list", pidList);

        return map;
    }

    @Override
    public void addComment(Comment comment) {
        pidMapper.addComment(comment);
    }

    @Override
    public String getLikeCheck(Like like) {
        return pidMapper.getLikeCheck(like);
    }

    @Override
    public void addLike(Like like) {
        pidMapper.addLike(like);
    }

    @Override
    public void updatePidLike(String likeCategory, int boardNum) {
        Map<String,Object> likeMap = new HashMap<>();

        likeMap.put("likeCategory", likeCategory);
        likeMap.put("boardNum", boardNum);

        pidMapper.updatePidLike(likeMap);
    }

    @Override
    public void updateLike(Like like) {
        pidMapper.updateLike(like);
    }

    @Override
    public boolean updatePid(Pid pid) {
        return pidMapper.updatePid(pid);
    }

    @Override
    public List<File> getFileList(int pidNum) {
        return pidMapper.getFileList(pidNum);
    }

    @Override
    public void updateFile(int fileNum) {
        pidMapper.updateFile(fileNum);
    }

    @Override
    public void deleteComment(int pidNum, int i) {

        Map<String,Object> map = new HashMap<>();

        map.put("boardNum",pidNum);
        map.put("deleteCategory", i);

        pidMapper.deleteComment(map);
    }

    @Override
    public boolean deletePid(int pidNum) {
        return pidMapper.deletePid(pidNum);
    }

    @Override
    public boolean updateComment(Comment comment) {
        return pidMapper.updateComment(comment);
    }

    @Override
    public void deleteLike(int pidNum) {
        pidMapper.deleteLike(pidNum);
    }

}
