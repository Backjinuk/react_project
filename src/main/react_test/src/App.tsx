import React, {useState} from 'react';
import './App.css';
import axios from "axios";
import Login from "./Login"
import Blog from "./BlogList/Blog"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import TopBar from "./BlogList/TopBar";
import ChatRoom from "./Chat/ChatRoom";
import ChatList from "./Chat/ChatList";

function App() {

    const [loginEvent, setLoginEvent] = useState(false);

    const loginCheck = () => {
        axios.get("/member/loginCheck")
            .then((res) => {
                if (res.data !== "n") {
                    setLoginEvent(true);
                }
            })
    }

    return (
        <div className="App">
            <BrowserRouter>
                <TopBar loginEvent={loginEvent}/>
                    <Routes>
                        <Route path={"/ChatRoom"} element={<ChatRoom/>}/>
                        <Route path={"/ChatRooms"} element={<ChatRoom/>}/>

                {!loginEvent ?

                    <Route path={"/*"} element={<Login loginCheck={loginCheck}/>} />  :

                    <Route path={"/*"} element={<Blog/>} />
                }

                    <Route path={"/ChatList"} element={ <ChatList/> }/>
                    </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
