import $ from "jquery";
import axios from "axios";

export default function UpdateCommentBox({ChangeLoadingEvent} : any) {


    const commentUpdate = () => {

        $(function () {

            $(".updateCommentBtn").off("click").on("click", function () {

                let commentNum = $(this).parents(".commentBox").find(".commentNum")
                let commentText = $(this).parents(".commentBox").find(".updateCommentInput")

                axios.post("/pid/updateComment", JSON.stringify({
                    commentNum : commentNum.val(),
                    commentText : commentText.val()
                }), {
                    headers : {
                        "Content-Type" : "application/json",
                    },
                }).then ( (res) => {
                    ChangeLoadingEvent();
                    commentText.val("");
                    $(this).parents(".commentBox").find(".updateCommentBox").slideUp();
                })
            })

        })


    }

    return(
        <div className={"updateCommentBox"} style={{display: "none"}}>
            <div className="form-floating updateCommentText">
                <input className="form-control updateCommentInput"
                       placeholder="Leave a comment here"
                       id="floatingInput" style={{height: "36px"}} onClick={commentUpdate}/>
                <label htmlFor="floatingInput" style={{fontSize: "0.5rem"}}>댓글 수정하기</label>
            </div>
            <button className={"btn btn-primary updateCommentBtn"} >수정</button>
        </div>
    )
}