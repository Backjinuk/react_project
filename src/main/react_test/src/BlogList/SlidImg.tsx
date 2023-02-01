import {useState} from "react";
import {fileType} from "./Blog";
import "../css/Blog.css"

export default function SildImg({fileList}: any) {

    const [boardNum, setBoardNum] = useState("");

    if ( !boardNum) {
        setBoardNum(fileList[0].boardNum)
    }

    return (
        <div className=" bg-black cardImg">
            <div id={`carouselExampleIndicators${boardNum}`} className="carousel slide" data-bs-ride="false">
                <div className="carousel-indicators">
                    {fileList.map((file: fileType, index: number) => (
                        <button type="button" data-bs-target={`#carouselExampleIndicators${boardNum}`}
                                data-bs-slide-to={index}
                                className="active" aria-label="Slide 1"
                                aria-current="true"
                                key={index}
                        >
                        </button>
                    ))}
                </div>
                <div className="carousel-inner">
                    {fileList.map((file: fileType, index: number) => (
                        <div className={index === 0 ? "carousel-item active" : "carousel-item"} key={index}>
                            <input type={"hidden"} value={file.fileNum}/>
                            <img alt={"이미지가 없습니다"} className={"pidMig"} src={require(`../../resources${file.fileName}`)}/>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev" type="button"
                        data-bs-target={`#carouselExampleIndicators${boardNum}`} data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button"
                        data-bs-target={`#carouselExampleIndicators${boardNum}`} data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}