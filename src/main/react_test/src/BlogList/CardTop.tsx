import "../css/Blog.css";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function CardTop({pid, ChangeLoadingEvent}: any) {

    const [userId, setUserId] = useState('')
    const [title, setTitle] = useState('')
    let fileSize: number;
    const fromData = new FormData()

    useEffect(() => {
        axios.get("/member/loginCheck")
            .then((res) => {
                setUserId(res.data);
            })
    }, [])

    const changeFile = (e: any) => {
        fileSize = e.target.files.length;
        for (let i = 0; i < fileSize; i++) {
            fromData.append("file", e.target.files[i]);
        }
    }


    const updatePid = () => {
        if (!fileSize || !title) {
            Swal.fire({
                icon: 'error',
                title: '내용을 다시 확인해 주세요.',
            })
            return;
        }

        axios.post("/pid/updatePid", JSON.stringify({
            pidNum : pid.pidNUm,
            pidTitle : title,
        }),{
            headers : {
                "Content-Type" : "application/json"
            },
        }).then((res) => {

            if(res){
                fromData.append("pidNum", pid.pidNum)

                axios.post("/pid/updateFile", fromData, {
                    headers: {
                        "Content-Type": "multiple/form-data",
                    },
                }).then((res) => {
                    if (res) {
                        Swal.fire({
                            icon: 'success',
                            title: '수정되었습니다.',
                        })

                        ChangeLoadingEvent()
                    }
                })
            }
        })

    }

    const deletePid = () => {
        axios.post("/pid/deletePid", JSON.stringify({
            pidNum: pid.pidNum,

        }), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => {
            Swal.fire({
                icon: 'success',
                title: '삭제 되었습니다.',
            })

            ChangeLoadingEvent();
        })
    }

    return (

        <div className="card-top">
            <div className={"userImg"}></div>
            <div className={"userInfo"}>{pid.userId}</div>
            <div className={"Title"}>{pid.title}</div>

            <div className={"card-menu dropdown"}>

                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                     className="bi bi-three-dots" viewBox="0 0 16 16"
                     data-bs-toggle={pid.userId == userId ? "dropdown" : ""}>
                    <path
                        d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>

                <ul className="dropdown-menu dropdown-menu-dark">
                    <li>
                        <div className="dropdown-item" data-bs-toggle="modal"
                             data-bs-target="#updatePid">수정
                        </div>
                    </li>
                    <li>
                        <div className="dropdown-item" onClick={deletePid}>삭제</div>
                    </li>
                </ul>
            </div>


            <div className="modal fade " id="updatePid" data-bs-backdrop="static" data-bs-keyboard="false"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">게시물 등록 하기</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>

                        <div className="modal-body">
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control setId" id="blogTitle" value={title}
                                       onChange={(e) => {
                                           setTitle(e.target.value)
                                       }}
                                       placeholder="name@example.com"/>
                                <label htmlFor="floatingId">제목</label>
                            </div>

                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="blogImg" multiple={true}
                                       onChange={(e) => changeFile(e)}/>
                                <label className="input-group-text" htmlFor="blogImg">Upload</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> 취소
                            </button>

                            <button type={"button"} className="btn btn-info" onClick={updatePid}>등록하기
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}