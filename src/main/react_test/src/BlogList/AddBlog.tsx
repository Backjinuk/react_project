import {useState} from "react"
import Swal from "sweetalert2";
import axios from "axios"

export default function AddBlog( {ChangeLoadingEvent} : any) {

    const [title, setTitle] = useState('');
    let fileSize: number;
    const fromData = new FormData()

    const changeFile = (e: any) => {
        fileSize = e.target.files.length;
        for (let i = 0; i < fileSize; i++) {
            fromData.append("file", e.target.files[i]);
        }
    }

    const addBlog = () => {

        if(!fileSize || !title){
            Swal.fire({
                icon: 'error',
                title: '등록에 실패하였습니다.',
            })
            return;
        }

        axios.post("/pid/addPid", JSON.stringify({
            pidTitle: title
        }), {
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {

            fromData.append("pidNum", res.data);

            axios.post("/pid/uploadFile", fromData, {
                headers: {
                    "Content-Type": "multiple/form-data",
                },

            }).then((res) => {
                if (res) {
                    Swal.fire({
                        icon: 'success',
                        title: '등록되었습니다.',
                    })

                    ChangeLoadingEvent();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: '등록에 실패하였습니다.',
                    })
                }
            })
        })
    }


    return (
        <div className={"mt-3 addBlog"}>
            <input className={"btn btn-primary addBlogBtn"} value={"createPid"} data-bs-toggle="modal" readOnly
                   data-bs-target="#addBlog"/>
            <div className="modal fade " id="addBlog" data-bs-backdrop="static" data-bs-keyboard="false"
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
                                       onChange={(e) => setTitle(e.target.value)}
                                       placeholder="name@example.com"/>
                                <label htmlFor="floatingId">제목</label>
                            </div>

                            <div className="input-group mb-3">
                                <input type="file" className="form-control" id="blogImg"
                                       onChange={(e) => changeFile(e)}
                                       multiple={true}
                                />
                                <label className="input-group-text" htmlFor="blogImg">Upload</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> 취소
                            </button>

                            <button type={"button"} className="btn btn-info"
                                    onClick={addBlog}
                            >등록하기
                            </button>

                        </div>
                    </div>

                </div>
            </div>


        </div>

    )
}