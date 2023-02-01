import io from "socket.io-client";
import React, {useEffect, useState} from "react";
import "../css/Chat.css"
import ChatImgButton from "./ChatImgButton";
import $ from "jquery";
import axios from "axios";


export default function ChatRoom() {

    const [loadingEvent, setLoadingEvent] = useState(false);
    const [msg, setMsg] = useState('')
    const [userId, setUserId] = useState('');
    const [userImage, setUserImage] = useState('')
    const [boardUserImage, setBoardUserImage] = useState('');

    const eventLoading = (socket: any) => {

        const chatMsg = (data: any) => {
            // @ts-ignore
            var nUserId = document.getElementById("nickName").value;

            var file : string = data.file;

            var str = file.split("/");

            console.log(str);

            const li = document.createElement("li");
            if (data.userId[0]) {
                li.classList.add((nUserId == data.userId ? "sent" : "received"));
                if (data.file) {
                    li.innerHTML = ` <span class="userProfile">
                                <span class="userId">${data.userId}</span>
                                
                                <img src="https://placeimg.com/50/50/any" alt={"any"}/>
                            </span>
                    <span className="message">` +
                    `<img src="/static/media/5ea7e923-3de4-4818-8160-2c89cac56f85img.e96c08f21214f62cd963.jpg" alt="왜없어"/>`+
                    `</span>
                    <span class="time">${data.time}</span>`
                } else {
                    li.innerHTML = ` <span class="userProfile">
                                <span class="userId">${data.userId}</span>
                                <img src="https://placeimg.com/50/50/any" alt={"any"}/>
                            </span>
                        <span class="message">${data.msg}</span>
                        <span class="time">${data.time}</span>`
                }
            }

            $(function () {

                var chatList = $(".chatting_list")
                var chatInput = $(".chatInput")

                chatList.append(li);
                chatInput.val("");

                $("#ChatTextBox").scrollTop($("#ChatTextBox")[0].scrollHeight);

            })
        }

        socket.on("sendRoomId", (data: any) => {
            console.log("111 : " + data);
            // @ts-ignore
            document.querySelector("#roomId").value = data
        })

        socket.on("MsgList", (MsgList: any) => {
            console.log("222");
            console.log(MsgList);

            $(function () {
                $(".chatting_list *").remove();
            })

            MsgList.map((msg: any) => {
                chatMsg(msg);
            })
        })

        socket.on("receive", (socket: any) => {
            console.log("333");
            chatMsg(socket.newChatMsg);
        })


        $(function () {

            $(".addChat").off("click").on("click", function () {

                var roomId = $("#roomId").val()
                const data = {
                    msg: $(".chatInput").val(),
                    userId: $("#nickName").val(),
                    roomId: roomId
                }

                socket.emit("send", data)

            })

            $("#ChatImg").off("change").on("change", function (e: any) {
                const fromData = new FormData();
                let fileSize = e.target.files.length;

                for (let i = 0; i < fileSize; i++) {
                    fromData.append("file", e.target.files[i])
                }

                axios.post("/pid/chat/ChatImg", fromData, {
                    headers: {
                        "Content-Type": "multiple/form-data",
                    }
                }).then((res) => {

                    console.log(res.data);

                    for (let i = 0; i < res.data.length; i++) {
                        socket.emit("ChatImg", {
                            file: res.data[i],
                            userId: $("#nickName").val(),
                            roomId: $("#roomId").val()
                        });

                    }

                })


            })


        })
    }


    useEffect(() => {

        setTimeout(() => {
            // @ts-ignore
            const boardUserId = document.querySelector("#boardUserId").value;
            // @ts-ignore
            const boardNum = document.querySelector("#pidNum").value;
            // @ts-ignore
            const roomId = document.querySelector("#roomId").value;
            // @ts-ignore
            const userId = document.querySelector("#nickName").value;

            if (!loadingEvent) {

                if (!roomId) {

                    axios.post("/pid/chat/addChat", {
                        // @ts-ignore
                        boardUserId: boardUserId,
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                    }).then((res) => {

                        // @ts-ignore
                        document.querySelector("#roomId").value = res.data.roomId
                        setUserId(res.data.userId)
                        setUserImage(res.data.userImage)
                        setBoardUserImage(res.data.boardUserImage);

                        const socket = io("http://localhost:5000/Chat", {
                            query: {
                                roomId: res.data.roomId,
                                userId: res.data.userId,
                                BoardUserId: boardUserId,
                                boardNum: boardNum,
                                userImage1: res.data.userImage,
                                userImage2: res.data.boardUserImage
                            },
                        }).connect()

                        eventLoading(socket);
                    })
                }

                if (roomId) {

                    const socket = io("http://localhost:5000/Chat", {
                        query: {
                            roomId: roomId,
                            userId: userId,
                            BoardUserId: boardUserId,
                            boardNum: boardNum,
                            userImage1: userImage,
                            userImage2: boardUserImage
                        },
                    }).connect();

                    eventLoading(socket);
                }

            }
            setLoadingEvent(true);
        }, 1000)
    }, [])


    return (
        <div className={"ChatBox shadow-lg"}>

            <input type={"hidden"} id={"boardUserId"}/>
            <input type={"hidden"} id={"pidNum"}/>
            <input type={"hidden"} id={"roomId"}/>

            <div className={"ChatUserInfo"}>
                <label form={"nickName"}>대화명</label>
                {userId ?
                    <input id={"nickName"} value={userId} readOnly={true}/> :
                    <input id={"nickName"}/>
                }
                <ChatImgButton/>
            </div>

            <div className={"ChatTextBox"} id={"ChatTextBox"}>


                <ul className={"chatting_list"}>

                </ul>
            </div>

            <div className={"ChatInputBox"}>
                    <span>
                        <input type="text" className={"chatInput"} value={msg}
                               onChange={(e) => setMsg(e.target.value)}/>
                        <button className={"addChat"}> Request</button>

                    </span>

            </div>


        </div>
    )
}