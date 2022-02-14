import React, { useState } from "react";
import "./Followers.css";
import ProfileImg from "../../Assets/Images/nathan-dumlao-yAS082fvix8-unsplash.jpg";
import Loader from "../Loader/Loader";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Followers = () => {

    const [followersBlock, setFollowersBlock] = useState("block");
    const [followingsBlock, setFollowingsBlock] = useState("hide");
    const [currentActiveUser, setCurrentActiveUser] = useState({});
    const [user, setUser] = useState({});
    const [followerUsers, setFollowerUsers] = useState([]);
    const [followingUsers, setFollowingUsers] = useState([]);

    ///////////////////////////////////
    ////// handle followers block
    const handleFollowersBlock = () => {
            setFollowersBlock("block");
            setFollowingsBlock("hide");
    }


    ////////////////////////////
    ////////// handle followings block
    const handleFollowingsBlock = () => {
            setFollowingsBlock("block");
            setFollowersBlock("hide");
    }


    ///////////////////////////////
    //////////// load active user

    const loadActiveUser = async () => {
        try {
            const res = await axios.post("http://localhost:8000/get_active_user_by_token", { token: Cookies.get("jwt") });

            if (res.status === 200) {
                setCurrentActiveUser(res.data.activeUser);
            }
            else {
                console.log(res.data.msg)
            }

        } catch (error) {
            console.log(error.message);
        }
    }





    ///////////////////////////////////////////////////////
    ////////////////////// get user by id
    // const getUserById = async (id) =>{
    //     try{
    //         const res = await axios.get(`http://localhost:8000/get_user_by_id/${id}`);

    //         if(res.status === 200){
    //             setUser(res.data);
    //         }
    //         else{
    //             console.log(res.data.msg)
    //         }
    //     }catch(error){
    //         console.log(error.message);
    //     }
    // }


    ///////////////////////////////////////////////////////////
    /////////////// get all followers user
    const getAllFollowersUsers = async () =>{
            currentActiveUser.followers.map(async (followerID) =>{

                    try{
                        const res = await axios.post(`http://localhost:8000/get_user_by_id/${followerID}`);
                        if(res.status === 200){
                            setFollowerUsers([...followerUsers, res.data.user]);
                        }
                        else{
                            console.log(res.data.msg)
                        }
                    }catch(error){
                        console.log(error.message);
                    }
            })
    }

    /////////////////////////////////////////////////////////
    /////////////// get all followings user
    const getAllFollowingsUser = async () =>{
        currentActiveUser.followings.map( async (followingID) =>{
            try{
                const res = await axios.post(`http://localhost:8000/get_user_by_id/${followingID}`);

                if(res.status === 200){
                    setFollowingUsers([...followingUsers, res.data.user]);
                }
                else{
                    console.log(res.data.msg);
                }

            }catch(error){
                console.log(error.message);
            }
        })
    }


    
    useEffect(() => {
        loadActiveUser();
    },[])

    useEffect(()=>{
            getAllFollowersUsers();
    },[currentActiveUser])

    useEffect(()=>{
            getAllFollowingsUser();
    },[currentActiveUser])



    return (
        <>
            <div className="followers__main">

                <div className="followers___wrapper">
                    <div className="foll_wrapper_header">
                        <div className="left">
                            <button onClick={handleFollowersBlock}>Followers</button>
                        </div>

                        <div className="right">
                            <button onClick={handleFollowingsBlock}>Followings</button>
                        </div>
                    </div>

                    {/*  followers wrapper body */}
                    <div className={`followers_wrapper___body ${followersBlock}`}>

                        {
                            followerUsers.map((user) => {

                                    return (
                                        <div className="suggestion_item" key={user._id}>
                                            <div className="suggestion_item_left">
                                                <div className="suggestion_profile">
                                                   <img src={user.profileImg ? `${process.env.REACT_APP_IMAGE_PATH}${user.profileImg}` : `${process.env.REACT_APP_IMAGE_PATH}user (1).png`} alt="profile" />
                                                </div>
                                                <div className="name">
                                                    <p>{user.name}</p>
                                                </div>
                                            </div>
                                            <div className="follow_btn">
                                                <button>Follow</button>
                                            </div>
                                        </div>
                                )
                            })
                        }

                      

                    </div>



                    {/* following wrapper body */}
                    <div className={`followers_wrapper___body ${followingsBlock}`}>

                      {
                            followingUsers.map((user) => {

                                    return (
                                        <div className="suggestion_item" key={user._id}>
                                            <div className="suggestion_item_left">
                                                <div className="suggestion_profile">
                                                    <img src={user.profileImg ? `${process.env.REACT_APP_IMAGE_PATH}${user.profileImg}` : `${process.env.REACT_APP_IMAGE_PATH}user (1).png`} alt="profile" />
                                                </div>
                                                <div className="name">
                                                    <p>{user.name}</p>
                                                </div>
                                            </div>
                
                
                                            <div className="follow_btn">
                                                <button>Unfollow</button>
                                            </div>
                                       </div>
            
                                )
                            })
                        }

                        
                    </div>




                </div>

            </div>
        </>
    )
}

export default Followers;