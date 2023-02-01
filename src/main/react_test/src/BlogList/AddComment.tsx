import "../css/Blog.css"
import axios from "axios";
import $ from "jquery";
import Swal from "sweetalert2";


export default function AddComment( {pid, ChangeLoadingEvent} : any){

    const SetComment = () =>{

        $(function() {

            $(".addCommentBtn").off("click").on("click", function(){

                let commentText = $(this).parents(".addCommentBox").find(".addCommentInput");
                let boardNum = pid.pidNum

                axios.post("/pid/addComment", JSON.stringify({
                    commentText : commentText.val(),
                    boardNum
                }), {
                    headers : {
                        "Content-Type" : "application/json"
                    },
                }).then( (res) => {
                    if(res){
                        Swal.fire({
                            icon: 'success',
                            title: '등록되었습니다.',
                        })
                        commentText.val("")
                        ChangeLoadingEvent()
                    }
                })

            })

        });

    }



    return (
        <div className={"addCommentBox mt-1"}>

            <div className="form-floating addCommentText">
                <input className="form-control addCommentInput" placeholder="Leave a comment here" id="floatingInput"
                onClick={SetComment}/>
                <label htmlFor="floatingInput">댓글 입력하기...</label>
            </div>

            <button className={"addCommentBtn"}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-cursor" viewBox="0 0 16 16">
                    <path
                        d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103zM2.25 8.184l3.897 1.67a.5.5 0 0 1 .262.263l1.67 3.897L12.743 3.52 2.25 8.184z"/>
                </svg>
            </button>
        </div>
    )
}