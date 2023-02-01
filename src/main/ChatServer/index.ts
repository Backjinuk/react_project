const http = require("http");
const express = require("express");
const app = express();
const path = require("path");
const io = require('socket.io');
const moment = require("moment");
const mongoose = require("mongoose");
const multer = require("multer");
const upload =  multer({ dest : '../react_test/resources/UploadImg/ChatImg'})

app.post('/upload', upload.single('avatar'), function(req: any, res : any){
    res.send('Uploaded:' + req.file);
})

// 5000 포트에서 서버를 오픈한다.
const httpServer = http.createServer(app).listen(5000);

const socketServer = io(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

mongoose.connect("mongodb://localhost:27017/Chat")


const chatRoom = mongoose.Schema({
    users: [{userId: 'string', regDate: 'number', userImage: 'string'}],
    roomId: 'string',
    roomName: 'string',
    roomImage: 'string',
    boardNum: 'number'
})


const chatMsg = mongoose.Schema({
    userId: ['string'],
    userImage: 'string',
    roomId: 'string',
    msg: 'string',
    file: 'string',
    time: 'string',
    rtime: 'string',
    unreadUser: ['string'],
    imgCheck: 'number',
})

const db = mongoose.connection;
const ChatMsg = mongoose.model('ChatMsg', chatMsg);
const ChatRoom = mongoose.model('ChatRoom', chatRoom)

db.once('open', () => {
    console.log("DB가 연결 되었습니다.")
})


app.use(express.static(path.join(__dirname, "src")));

const ChatList = socketServer.of("/ChatList")

ChatList.on('connection', (socket: any) => {
    const userId = socket.handshake.query.userId
    console.log(userId + " 님 환영합니다. ")

    if (userId.length > 1) {
        ChatRoom.find( {'users.userId': userId}, (error: any, result: any) => {
            if (error) {
                console.log(error);
            } else {
                result.forEach( (data : any, index : number)  => {
                    ChatMsg.find({"roomId" : data.roomId}, (error : any, msg : any) => {
                        if(error){
                            console.log(error);
                        }else {
                             const arr = new Array({
                                userId : msg[0].userId[0],
                                roomId : msg[0].roomId,
                                msg : msg[0].msg,
                                time : msg[0].time,
                                rtime : msg[0].rtime,
                                unreadUser : msg[0].unreadUser,
                                boardUserId : result[index].users[0].userId,
                                pidNum : result[index].boardNum,
                                 ruserId : userId
                            });
                            ChatList.emit("ChatListMsg", {arr});
                        }
                    }).sort({_id: -1}).limit(1)
                })

            }
        })
    }

})


const ChatTing = socketServer.of("/Chat")

ChatTing.on('connection', (socket: any, error: any) => {

    console.log("해윙 : " + socket.id);

    let roomId = socket.handshake.query.roomId
    const userId = socket.handshake.query.userId
    const BoardUserId = socket.handshake.query.BoardUserId
    const userImage = socket.handshake.query.userImage
    const BoardUserImage = socket.handshake.query.BoardUserImage
    const boardNum = socket.handshake.query.boardNum

    console.log(userId + " : " + BoardUserId +  " : " + boardNum)

    if(roomId.length > 1  && BoardUserId.length > 1){

    console.log("--------------- " + roomId);

    ChatRoom.findOne({
        $or: [{
            $or: [{'users.0.userId': userId, 'users.1.userId': BoardUserId}, {
                'users.1.userId': userId,
                'users.0.userId': BoardUserId
            }]
        }, {roomId: roomId}]

    }, function (error: any, result: any) {

        if (!result) {

            console.log("---------------------------------------------------------------------")
            console.log("현재 검색된 채팅방이 없습니다")
            console.log("---------------------------------------------------------------------")

            result = new ChatRoom({
                users: [
                    {userId: userId, regData: moment(new Date()), userImage: userImage},
                    {userId: BoardUserId, regData: moment(new Date()), userImage: BoardUserImage}
                ],
                roomId: roomId, roomName: roomId, boardNum: boardNum
            })

            if (roomId) {

                result.save(function (error: any, result: any) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log("---------------------------------------------------------------------")
                        console.log('새로운 채팅방을 만듭니다')
                        console.log("새로운 채팅방의 정보 입니다. : " + result.roomId);
                        console.log("---------------------------------------------------------------------")
                    }
                })
                new ChatMsg({
                    roomId: roomId,
                    msg: '채팅방이 새로 열렸습니다',
                    time: moment(new Date()).format("h:mm A"),
                    rtime: moment(new Date()),
                }).save();

            }
        } else if (result) {

            console.log("---------------------------------------")
            console.log("검색된 채팅방입니다.")
            console.log(" 1 " + result.roomId);
            socket.join(result.roomId);
            console.log("---------------------------------------")

            ChatTing.to(result.roomId).emit("sendRoomId", result.roomId);

            ChatMsg.find({roomId: result.roomId},
                function (error: any, msg: any) {
                    if (error) {
                        console.log(error)
                    } else {
                        console.log(" 2 " + result.roomId);
                        ChatTing.to(result.roomId).emit("MsgList", msg);

                    }
                })
        }

    })


    socket.on("send", (data: any, error: any) => {
        if (error) {
            console.log(error);
        }

        console.log("Clarinet 에서 받은 Data")
        console.log("roomId : " + data.roomId);
        console.log(data);
        console.log("---------------------------------------------------------------------")

        const newChatMsg = new ChatMsg({
            userId: data.userId,
            userImage: data.userImage,
            roomId: data.roomId,
            msg: data.msg,
            file: data.file,
            time: moment(new Date()).format("h:mm A"),
            rtime: moment(new Date()),
            imgcheck: data.imgcheck
        })

        newChatMsg.save(function (error: any) {
            if (error) {
                console.log(error);
            } else {
                console.log(" 3 " + data.roomId);
                ChatTing.to(data.roomId).emit("receive", {newChatMsg})
            }
        })

    })

        socket.on("ChatImg", (data : any, error : any) => {
            if(error){
                console.log(error)
            }else{
                const newChatMsg = new ChatMsg({
                    userId: data.userId,
                    userImage: data.userImage,
                    roomId: data.roomId,
                    msg: data.msg,
                    file: data.file,
                    time: moment(new Date()).format("h:mm A"),
                    rtime: moment(new Date()),
                    imgcheck: data.imgcheck
                })

                newChatMsg.save( function (error : any){
                    if(error){
                        console.log(error);
                    } else {
                        console.log(" 3 " + data.roomId);
                        ChatTing.to(data.roomId).emit("receive", {newChatMsg})
                    }
                })
            }
        })

    } else {
        console.log("fail");
        socket.disconnect()
    }


})



