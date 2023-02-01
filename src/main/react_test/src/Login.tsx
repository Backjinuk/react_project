import Swal from "sweetalert2";
import {ChangeEvent, useState, useEffect} from "react"
import axios from "axios";

export default function Login( {loginCheck} : any)  {

    const sty: any = {
        borderRadius: "5px",
        border: "1px solid rgba(0, 0, 0, 0.16)",
        width: "500px",
        alignContent: "center",
        padding: "15px",
        position: "absolute",
        top: "30%",
        left: "39%",
    };
    const [id, setId] = useState('');
    const [pwd , setPwd] = useState('');
    const [sid, setSid] = useState('');
    const [spwd, setSpwd] = useState('');
    const [emile, setEmile] = useState('');
    const [phone, setPhone] = useState('');
    const [idSearch, setIdSearch] = useState('');
    const [addMemberbtn, setAddMemberBtn] = useState(false);


    useEffect( () => {
        loginCheck();
    },[])


    const LoginMember = () => {
        axios.post("/member/login", JSON.stringify({
            id : id,
            password : pwd
        }),{
            headers : {
                "Content-Type" : "application/json"
            }
        }).then( (res) => {
            if (res.data === 'y'){
                Swal.fire({
                    icon: 'success',
                    title: '로그인 되었습니다.',
                })

                loginCheck();
            } else{
                Swal.fire({
                    icon: 'error',
                    title: '아이디 혹은 비밀번호를 다시 확인해주세요.',
                })
            }
        })

    }


    function LoginCheck(e: ChangeEvent<HTMLInputElement>) {

        axios.post("/member/searchMember", JSON.stringify(
            {id: e.target.value}
        ), {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            if (res.data === 'y') {
                setIdSearch("이미 사용중인 아이디 입니다")
                setAddMemberBtn(true);
            } else {
                setIdSearch("사용 가능한 아이디 입니다")
                setAddMemberBtn(false);
            }
        })

        setSid(e.target.value)

    }

    function addMember() {

        let data = {
            id: sid,
            password: spwd,
            emile,
            phone
        }
        if (!data.id) {
            Swal.fire({
                icon: 'error',
                title: '아이디를 입력하여 주세요.',
            })
            return;
        } else if (!data.password) {
            Swal.fire({
                icon: 'error',
                title: '비밀번호를 입력하여 주세요.',
            })
            return;
        } else if (!data.emile) {
            Swal.fire({
                icon: 'error',
                title: '이메일 입력하여 주세요.',
            })
            return;
        } else if (!data.phone) {
            Swal.fire({
                icon: 'error',
                title: '전화번호 입력하여 주세요.',
            })
            return;
        }

        axios.post(`/member/addMember`, JSON.stringify(data), {
            headers: {
                "Content-Type": `application/json`,
            },
        }).then(res => {

            console.log(res)

        })


    }

    return (

        <>
            <div className={"text-center shadow-lg"} style={sty}>
                <div className="form-signin w-100 m-auto">
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" value={id}
                               placeholder="name@example.com"
                                onChange={ (e) => setId(e.target.value)}
                        />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" value={pwd}
                               placeholder="Password"
                               onChange={ (e)=> setPwd(e.target.value)}
                        />
                        <label htmlFor="floatingPassword">Password</label>
                    </div>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me
                        </label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary mb-2" type="submit" onClick={ LoginMember }>로그인</button>
                    <button className="w-100 btn btn-lg btn-info"  data-bs-toggle="modal"
                            data-bs-target="#addMemeber">회원 가입
                    </button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2022</p>

                </div>

            </div>

            <div className="modal fade " id="addMemeber" data-bs-backdrop="static" data-bs-keyboard="false"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">회원가입</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <form id={"addMemeber"}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control setId" id="floatingId" value={sid}
                                           onChange={(e) => LoginCheck(e)}
                                           placeholder="name@example.com"/>
                                   {idSearch === '' ?
                                        <label htmlFor="floatingId">아이디</label> :
                                        <label style={{color: "red"}}>{idSearch}</label>
                                    }

                                </div>

                                <div className="form-floating mb-3">
                                    <input type="password" className="form-control" id="floatingSpassword" value={spwd}
                                           onChange={(e) => {
                                               setSpwd(e.target.value)
                                           }}
                                           placeholder="Password"/>
                                    <label htmlFor="floatingSpassword">비밀번호</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingEmile" value={emile}
                                           onChange={(e) => {
                                               setEmile(e.target.value)
                                           }}
                                           placeholder="Password"/>
                                    <label htmlFor="floatingEmile">Email</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="floatingPhone" value={phone}
                                           onChange={(e) => {
                                               setPhone(e.target.value)
                                           }}
                                           placeholder="Password"/>
                                    <label htmlFor="floatingPhone">Phone</label>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"> 취소
                                </button>

                                <button type={"button"} onClick={() => addMember()} className={ !addMemberbtn ? "btn btn-info" : "btn btn-danger disabled" }>회원가입
                                </button>

                            </div>
                        </form>
                    </div>

                </div>
            </div>

        </>


    )
}