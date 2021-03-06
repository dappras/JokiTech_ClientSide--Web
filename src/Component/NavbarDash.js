import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import axios from "axios";
import Cookies from 'universal-cookie';
import { useHistory } from "react-router";
import { MdOutlineDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import '../asset/CSS/NavbarDash.css'

const NavbarDash = () => {
    const [data, setData] = useState(null)
    const [isClicked, setIsClicked] = useState(false)
    const cookies = new Cookies()
    const history = useHistory()

    useEffect(() =>{
        axios.get("https://jokitech.herokuapp.com/api/v1/penjasas/view/" + cookies.get("dataId"), {headers: {Authorization: "Bearer " + cookies.get("token")}})
            .then(res => {
                setData(res)
            })
    }, [])


    const logout = () => {
        cookies.remove("token")
        cookies.remove("dataId")
        cookies.remove("dataEmail")
        cookies.remove("namaPenjasa")
        history.push("/")
    }

    return (
        <div className="navbarDash">
            <div className="bagianKiri">
                <Link to="/">
                    <div className="kiri">    
                        <img src={ process.env.PUBLIC_URL + "/logoWeb.png" }/>
                        <h6>JokiTech</h6>
                    </div>    
                </Link>
            </div>

            <div className="bagianTengah">
                <Link to="/">Home</Link>
                <Link to="/project">Project</Link>
                <Link to="/posting">Posting</Link>
                <Link to="/account">Account</Link>
            </div>

            <div className="bagianKanan">
                {data && <h4>{data.data.namaPenjasa}</h4>}
                {data && <img src={data.data.profilePicture} onClick={() => setIsClicked(!isClicked)} />}
                {isClicked && (
                    <div className="hambMenu">
                        <div className="segitiga">
                            <div className="arrow-up"></div>
                        </div>
                        <div className="item">
                        </div>    
                        <div className="item" onClick={logout}>
                            <IoIosLogOut color="white"/>
                            <p>Logout</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NavbarDash
