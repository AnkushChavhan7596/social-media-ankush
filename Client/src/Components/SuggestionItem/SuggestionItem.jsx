import React, {useState, useEffect} from "react";
import "./SuggestionItem.css";
import { Link } from "react-router-dom";
import Profile from "../../Assets/Images/nathan-dumlao-yAS082fvix8-unsplash.jpg";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const SuggestionItem = ({ user }) =>{
    const [activeUser, setActiveUser] = useState({});
    
    ////////////////////////////////////////
    ///////////// handle follow unfollow
    const handleFollowUnfollow = async (userID) =>{
        try{
            const res = await axios.post(`http://localhost:8000/follow-unfollow`, { id : userID, token : Cookies.get("jwt")});

            if(res.status === 200){
                console.log(res.data.msg);
            }
            else{
                if(res.data.followedYourSelf){
                    console.log("You can't follow yourself")
                    Swal.fire(
                        "Oops",
                        res.data.msg,
                        "info"
                    )
                }
                console.log(res.data.message);
            }

        }catch(error){
            console.log(error.message);
        }

    }

  ////////////////////////////////////////////
  //////////// active user
  const loadActiveUser = async (req, res)=>{
      try{

        const res = await axios.post("http://localhost:8000/get_active_user_by_token", {token : Cookies.get("jwt")});

        if(res.status === 200){
            setActiveUser(res.data.activeUser);
        }
        else{
            console.log(res.data.msg);
        }

      }catch(error){
          console.log(error.message);
      }
  }

  useEffect(()=>{
      loadActiveUser();
  },[])



   return(
       <>
          <div className="suggestion_item">
              <div className="suggestion_item_left">
                    <div className="suggestion_profile">
                       <img src={user.profileImg ? `${process.env.REACT_APP_IMAGE_PATH}${user.profileImg}` : `${process.env.REACT_APP_IMAGE_PATH}user (1).png`} alt="profile" />
                    </div>
                    <div className="name">
                        <p>{user.name}</p>
                    </div>
              </div>
             
              <div className="follow_btn">
                  <button onClick={() =>{handleFollowUnfollow(user._id)} }>{ user.followers.includes(activeUser._id) ? "Unfollow" : "Follow"}</button>
              </div>
          </div>


       </>
   )
}

export default SuggestionItem;