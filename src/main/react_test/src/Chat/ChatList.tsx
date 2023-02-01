import "../css/Chat.css"
import io from "socket.io-client";
import {useEffect, useState} from "react";
import axios from "axios";
import $ from "jquery";

export default function ChatList() {
    const [loadingEvent, setLoadingEvent] = useState(false);


    useEffect(() => {
        $(function () {

            if ($(".chatInfo")) {
                $(".chatListBox *").remove();
            }
        })

        if (!loadingEvent) {

            axios.get("/member/loginCheck").then((res) => {
                const ChatLists = (list: any, index: number) => {


                    const div = document.createElement("div");

                    div.classList.add("chatInfo")
                    div.classList.add("shadow-lg")
                    div.innerHTML = `
                <input hidden value=${list.roomId} class="ChatListRoomId"/>
                <input hidden value=${list.boardUserId} class="boardUserId"/>
                <input hidden value=${list.ruserId} class="userId"/>
                <input hidden value=${list.pidNum} class="boardNum"/>
                <img src="https://placeimg.com/50/50/any" alt={"any"}/>
                <span class="chatListMsgs">
                    <span>
                    ${list.userId}
                </span>
                <span>
                    ${list.msg}
                </span>
                </span>
                <span class="chatListTime">
                    ${list.time}
                </span>`

                    var chatListBox = $(".chatListBox")
                    chatListBox.append(div);
                }

                const socket = io("http://localhost:5000/ChatList", {
                    query: {
                        userId: res.data
                    }
                }).connect();


                socket.on("ChatListMsg", (data: any) => {

                    console.log(data.arr);

                    setTimeout(() => {
                        data.arr.map((msg: any, index: number) => {
                            ChatLists(msg, index);
                        }, 600)
                    })
                })

            })
        }

        setTimeout(() => {

            $(function () {

                $(".chatInfo").off("click").on("click", function () {

                    var roomId = $(this).find(".ChatListRoomId").val();
                    var boardUserId = $(this).find(".boardUserId").val();
                    var userId = $(this).find(".userId").val();
                    var boardNum = $(this).find(".boardNum").val();

                    var openWindow = window.open("/ChatRooms", "ChatRooms", "height=700, width=580")

                    setTimeout(() => {
                        // @ts-ignore
                        openWindow.document.querySelector("#roomId").value = roomId;
                        // @ts-ignore
                        openWindow.document.querySelector("#boardUserId").value = boardUserId;
                        // @ts-ignore
                        openWindow.document.querySelector("#nickName").value = userId;

                        // @ts-ignore
                        openWindow.document.querySelector("#pidNum").value = boardNum;

                    }, 800)


                })
            })
        }, 600)

        setLoadingEvent(true);

    }, [])


    return (
        <div className={"chatListBox"}>

        </div>
    )


}