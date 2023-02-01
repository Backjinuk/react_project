import CardTop from "./CardTop"
import SildImg from "./SlidImg"
import ItemBox from "./ItemBox"
import CommentBox from "./CommentBox";
import AddComment from "./AddComment";
import AddBlog from "./AddBlog";
import {useEffect, useState} from "react";
import ChatRoom from "../Chat/ChatRoom";
import ChatButton from "../Chat/ChatButton";

import axios from "axios";

export interface  fileType {
    fileNum: number,
    boardNum: number,
    fileName: string,
}

export interface commentType {
    commentNum : number,
    boardNum : number,
    userId : string,
    commentText : string,
    likeCount : number,
    regDate : Date

}

interface pidType {
    pidNum: number,
    userId: string,
    pidTitle: string,
    likeCount: number,
    regData: Date,
    likeCheck: string,
    fileList: fileType[],
    commentList : commentType[]
}

export default function Blog() : JSX.Element {

    const [pid, setPid] = useState<pidType[]>([]);
    const [loadingEvent, setLoadingEvent] =useState(false);


    const ChangeLoadingEvent = () => {
        if(!loadingEvent){
            setLoadingEvent(true)
        } else {
            setLoadingEvent(false)
        }
    }



    useEffect(() => {
        axios.get("/pid/getPidList")
            .then((res) => {
                setPid(res.data.list)
            })
    }, [loadingEvent])



    return (
        <div>
            <AddBlog ChangeLoadingEvent={ChangeLoadingEvent}/>
            {pid.map( (pid: pidType, index : number)  => {
                return(
                    <div className="row row-cols-1 row-cols-md-3 g-4 blogList" key={index}>
                    <div className={"col blog"}>
                        <div className="card h-100 shadow-lg">
                            <CardTop pid={pid} ChangeLoadingEvent={ChangeLoadingEvent}/>
                            <div className="card-body" style={{padding: 0 , marginBottom : "10px"}}>
                                {<SildImg fileList={pid.fileList}/>}
                                <ItemBox pid={pid} ChangeLoadingEvent={ChangeLoadingEvent}/>
                                <div className={"LikeCount"}>
                                    Like {pid.likeCount}
                                </div>
                                <CommentBox comment={pid.commentList} ChangeLoadingEvent={ChangeLoadingEvent} />
                            </div>
                            <AddComment pid={pid} ChangeLoadingEvent={ChangeLoadingEvent}/>
                        </div>
                    </div>
                </div>)
            })}

            <img src={require(`../resources/ChatImg/5ea7e923-3de4-4818-8160-2c89cac56f85img.jpg`)} width={500} height={500}/>

            <ChatButton/>
        </div>

    )
}