import "../css/Blog.css"
import {commentType} from "./Blog";
import CommentItem from "./CommentItem";
import {useState} from "react";
import UpdateCommentBox from "./UpdateCommentBox";

export default function CommentBox({comment, ChangeLoadingEvent,}: any): JSX.Element {

    const [more, setMore] = useState(false);

    const getSetEvent = (getEvent: boolean, setEvent: (arg0: boolean) => void) => {

        if (!getEvent) {
            setEvent(true)
        } else {
            setEvent(false);
        }
    }


    const lender = (): JSX.Element[] => {
        if (!more) {
            return (
                comment.filter((comment: commentType, index: number) => (index < 2))
                    .map((comment: commentType, index: number) => {
                            return (
                                <div className={"commentBox"} key={index}>
                                    <div className={"comment"}>
                                        <input hidden readOnly value={comment.commentNum} className={"commentNum"}/>
                                        <div className={"commentUser"}>
                                            {comment.userId}
                                        </div>
                                        <div className={"commentText ml-8"}>
                                            {comment.commentText}
                                        </div>
                                        <CommentItem comment={comment.commentNum} ChangeLoadingEvent={ChangeLoadingEvent}/>
                                    </div>
                                    <UpdateCommentBox ChangeLoadingEvent={ChangeLoadingEvent}/>
                                </div>
                            )
                        }
                    )
            )
        } else {
            return (
                comment.filter((comment: commentType, index: number) => (index >= 0))
                    .map((comment: commentType, index: number) => {
                            return (
                                <div className={"commentBox"} key={index}>
                                    <div className={"comment"} >
                                        <input hidden readOnly value={comment.boardNum} className={"commentNum"}/>
                                        <div className={"commentUser"}>
                                            {comment.userId}
                                        </div>
                                        <div className={"commentText ml-8"}>
                                            {comment.commentText}
                                        </div>
                                        <CommentItem comment={comment.commentNum} ChangeLoadingEvent={ChangeLoadingEvent}/>
                                    </div>
                                   <UpdateCommentBox ChangeLoadingEvent={ChangeLoadingEvent}/>
                                </div>
                            )
                        }
                    )
            )
        }

    }





    return (
        <>
            <div className={!more ? "CommentList mt-1" : "CommentListActive mt-1"}>
                {lender()}
                <input type={"button"} value={!more ? "더보기" : "숨기기"} className={"more"}
                       onClick={() => getSetEvent(more, setMore)}/>
            </div>
        </>
    )
}