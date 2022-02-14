import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Layouts/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Profile from "./Pages/Profile/Profile";
import Followers from "./Pages/Followers/Followers";
import Following from "./Pages/Following/Following";
import EditProfile from "./Pages/EditProfile/EditProfile";
import CreatePost from "./Pages/CreatePost/CreatePost";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Login from "./Pages/Login/Login";
import UpdatePost from "./Pages/UpdatePost/UpdatePost";
import Register from "./Pages/Register/Register";
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Comments from './Pages/Comments/Comments';
import ProfileUser from "./Pages/ProfileUsers/ProfileUser";
import env from "react-dotenv";
import Cookies from 'js-cookie';

// require("dotenv").config();
// require('dotenv-webpack');


function App() {

    return (
        <div className="App">
            <Router>
                <Navbar />

                <Routes>

                    {/* {
                        Cookies.get("jwt") ?

                            <Route path="/" element={<PrivateRoute />}>
                                <Route path="/" element={<Home />} />
                            </Route>

                            :

                           <Route path="/login" element={<Login />} />
                            
                     } */}


                    <Route path="/" element={<PrivateRoute />}>
                        <Route path="/" element={<Home />} />
                    </Route>

                    <Route path="/home" element={<PrivateRoute />}>
                        <Route path="/home" element={<Home />} />
                    </Route>

                    <Route path="/profile" element={<PrivateRoute />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="/profile/:id" element={<PrivateRoute />}>
                        <Route path="/profile/:id" element={<ProfileUser />} />
                    </Route>

                    <Route path="/create-post" element={<PrivateRoute />}>
                        <Route path="/create-post" element={<CreatePost />} />
                    </Route>

                    <Route path="/followers" element={<PrivateRoute />}>
                        <Route path="/followers" element={<Followers />} />
                    </Route>

                    <Route path="/comments/:id" element={<PrivateRoute />}>
                        <Route path="/comments/:id" element={<Comments />} />
                    </Route>


                    <Route path="/update-post/:id" element={<PrivateRoute />}>
                        <Route path="/update-post/:id" element={<UpdatePost />} />
                    </Route>

                    <Route path="/edit-profile" element={<PrivateRoute />}>
                        <Route path="/edit-profile" element={<EditProfile />} />
                    </Route>


                    <Route path="/following" element={<Following />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="*" element={<PageNotFound />} />

                </Routes>

            </Router>

        </div>
    );
}

export default App;
