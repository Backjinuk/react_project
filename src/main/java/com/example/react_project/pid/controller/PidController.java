package com.example.react_project.pid.controller;
import com.example.react_project.domain.Comment;
import com.example.react_project.domain.Like;
import com.example.react_project.domain.Pid;
import com.example.react_project.pid.service.PidService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/pid/*")
@Log4j2
public class PidController {

    @Autowired
    private PidService pidService;

    @Value("${file}")
    String uploadSrc;

    @Value("${chatfile}")
    String ChatUploadSrc;

    @RequestMapping("addPid")
    public int addPid(@RequestBody Pid pid,
                      HttpSession session){

        pid.setUserId((String)session.getAttribute("userId"));

        pidService.addPid(pid);

        return pid.getPidNum();
    }

    @RequestMapping("getPidList")
    public Map<String,Object> getPidList(HttpSession session){

        return pidService.getPidList(
                (String)session.getAttribute("userId"));
    }



    @RequestMapping("addComment")
    public Boolean addCommment(@RequestBody Comment comment
                                ,HttpSession session){
        comment.setUserId((String)session.getAttribute("userId"));

        pidService.addComment(comment);

        if (comment.getCommentNum() > 0){
            return true;
        }

        return true;
    }

    @RequestMapping("uploadFile")
    public boolean uploadFile(@RequestParam("pidNum") int boardNum
                              ,@RequestParam("file") ArrayList<MultipartFile> file) {

        for (int i = 0; i < file.size(); i++) {
            String fileName = "/uploadImg/pidImg/"+ UUID.randomUUID() + file.get(i).getOriginalFilename();

            pidService.uploadFile(boardNum, fileName);

            try {

                file.get(i).transferTo(new File(uploadSrc + fileName));

            } catch (Exception e){
                e.printStackTrace();

                return false;
            }
        }

        return true;

    }

    @RequestMapping("likeCount")
    public boolean likeCount(@RequestBody Like like,
                             HttpSession session){

        like.setUserId((String)session.getAttribute("userId"));

        String likeCheck = pidService.getLikeCheck(like);
        like.setLikeCheck(likeCheck);


        if (likeCheck == null){
            like.setLikeCheck("y");
            pidService.addLike(like);

            pidService.updatePidLike("1", like.getBoardNum());

            return true;

        } else if(likeCheck.equals("n")){
            pidService.updateLike(like);

            pidService.updatePidLike("1", like.getBoardNum());

            return true;
        } else if (likeCheck.equals("y")) {
            pidService.updateLike(like);


            pidService.updatePidLike("2", like.getBoardNum());

            return true;
        }


        return false;

    }

    @RequestMapping("updatePid")
    public boolean updatePid(@RequestBody Pid pid){
        return pidService.updatePid(pid);
    }

    @RequestMapping("updateComment")
    public boolean updateComment(@RequestBody Comment comment){
        return pidService.updateComment(comment);
    }

    @RequestMapping("deleteComment")
    public void deleteComment(@RequestBody Comment comment){
        pidService.deleteComment(comment.getCommentNum(),2);
    }

    @RequestMapping("updateFile")
    public boolean updateFile(@RequestParam("pidNum") int boardNum
                            ,@RequestParam("file") ArrayList<MultipartFile> file) {

        List<com.example.react_project.domain.File> fileList = pidService.getFileList(boardNum);

        deleteFile(fileList);

        return uploadFile(boardNum, file);
    }

    @RequestMapping("deletePid")
    public boolean deletePid(@RequestBody Pid pid){

        pidService.deleteComment(pid.getPidNum(),1);

        deleteFile(pidService.getFileList(pid.getPidNum()));

        pidService.deleteLike(pid.getPidNum());

        return pidService.deletePid(pid.getPidNum());
    }

    public void deleteFile( List<com.example.react_project.domain.File> fileList){

        for (int i = 0; i < fileList.size(); i++) {
            System.out.println(fileList);

            File files = new File(uploadSrc + fileList.get(i).getFileName());
            try {

                files.delete();

            }catch (Exception e){
                e.printStackTrace();
            }

            pidService.updateFile(fileList.get(i).getFileNum());
        }
    }


    @RequestMapping("/chat/addChat")
    public Map<String,Object> addChat(@RequestBody Map<String,Object> boardUserId
                                ,HttpSession session){
        Map<String,Object> map = new HashMap<>();

        map.put("roomId", UUID.randomUUID());
        map.put("userId", session.getAttribute("userId"));

        return map;
    }

    @RequestMapping("/chat/ChatImg")
    public List<String> ChatImg(@RequestBody List<MultipartFile> file){

        Map<String,Object> map;
        List<String> list = new ArrayList<>();

        for (int i = 0; i < file.size(); i++) {
            map = new HashMap<>();
            String fileName = "/ChatImg/"+ UUID.randomUUID() + file.get(i).getOriginalFilename();

            try {
                file.get(i).transferTo(new File(ChatUploadSrc + fileName));
            } catch (Exception e){
                e.printStackTrace();

            }
            list.add(fileName);
        }

        return list;
    }

























}
