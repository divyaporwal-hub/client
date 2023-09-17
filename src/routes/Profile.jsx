import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import User from "../components/User";
import { useParams } from "react-router-dom";
import axios from "axios";
import BlogImage from "../images/blog1.jpg";
import { BASE_URL } from "../helper/ref";
import Blog from "../components/Blog";
import ReactLoading from "react-loading";
const Profile = () => {
  const { userName } = useParams();
  const [userData, setUserData] = useState({});
  const [profileData, setProfileData] = useState({});
  const [userBlogs, setUserBlogs] = useState([]);
  const [postCount, setPostCount] = useState(0);
  const [userFollower, setUserFollower] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchUserBlogs(id) {
      let userBlogResult = await axios.get(
        `${BASE_URL}/blog/blogFindByUserId`,
        {
          params: {
            userId: id,
          },
        }
      );

      try {
        setUserBlogs(userBlogResult.data.reverse());
        setPostCount(userBlogResult.data.length);
        setLoading(false);
      } catch (err) {
        console.log("Error: blogs can't be feched due to", err);
      }
    }

    async function fetchUserInfo() {
      let userResult = await axios.get(`${BASE_URL}/user/userInfo`, {
        params: {
          userName: userName,
        },
      });

      async function fetchUserFollowers() {
        let followerResult = await axios.get(
          `${BASE_URL}/follower/getFollowers`,
          {
            params: {
              userId: userResult.data[0]._id,
            },
          }
        );
        setUserFollower(followerResult.data[0].followers.length);
      }

      try {
        setUserData(userResult.data[0]);
        fetchUserBlogs(userResult.data[0]._id);
        fetchUserFollowers(userResult.data[0]._id);
        setLoading(false);
      } catch (err) {
        console.log("Error: User can't be fetched due to", err);
      }
    }

    async function fetchUserProfile() {
      let profileResult = await axios.get(`${BASE_URL}/profile/getProfile`, {
        params: {
          userName: userName,
        },
      });
      try {
        if (profileResult.data.length) {
          setProfileData(profileResult.data[0]);
        }
      } catch (err) {
        console.log("Error: Profile can't be feched due to", err);
      }
    }
    fetchUserInfo();
    fetchUserProfile();
  }, [userName]);
  return (
    <>
      {/* <Navbar active={"profile"} /> */}
      <div className="Profile">
        <section className="userSection">
          {loading ? (
            <div
              className="loaderContainer"
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <ReactLoading
                type={"spin"}
                color={"#45aaff"}
                height={50}
                width={50}
              />
              <div style={{ marginTop: "10px", color: "white" }}>
                Please wait, Getting Your Profile...
              </div>
            </div>
          ) : (
            <User
              fullName={profileData ? profileData.fullName : userData.fullName}
              userName={profileData ? profileData.userName : userData.userName}
              userBio={profileData ? profileData.userBio : ""}
              location={profileData ? profileData.userCountry : "India"}
              postCount={postCount}
              followers={userFollower}
              userSocialLinks={profileData ? profileData.userSocialLinks : ""}
            />
          )}
        </section>
        <section className="blogSection">
          <div className="blogContextHeading">My Blogs</div>
          {userBlogs &&
            userBlogs.map((blog, index) => {
              return (
                <>
                  <div className="blogLine"></div>
                  <Blog
                    blogImage={BlogImage}
                    heading={blog.blogHeading}
                    uploadTime={blog.blogSaveTime}
                    userId={blog.userId}
                    minuteRead={blog.minuteRead}
                    blogPreview={blog.blogText}
                    blogId={blog._id}
                    blogTags={blog.blogTags}
                    key={index}
                  />
                </>
              );
            })}
        </section>
      </div>
    </>
  );
};
export default Profile;
