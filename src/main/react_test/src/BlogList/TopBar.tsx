import {Link, NavLink} from "react-router-dom";
import React from "react";


export default function TopBar({loginEvent} : any ) {

    return (
        <>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="#">Navbar </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarText"
                            aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="#">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="#">마이페이지</NavLink>
                            </li>
                            <li className="nav-item">
                                {!loginEvent ?
                                    <NavLink className="nav-link" to="#" data-bs-toggle="modal"
                                             data-bs-target="#LoginModal">로그인</NavLink>
                                    : <NavLink className="nav-link" to="#">로그아웃</NavLink>
                                }
                            </li>
                        </ul>

                    </div>
                </div>

            </nav>


        </>


    )
}