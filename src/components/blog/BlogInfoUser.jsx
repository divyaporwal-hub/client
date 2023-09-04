import React, { useEffect, useState } from "react";
import "../../styles/BlogInfoUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import { BASE_URL } from "../../helper/ref";
import { NavLink, Link } from "react-router-dom";
import ReactLoading from "react-loading";
import Avatar from "react-avatar";

function BlogInfoUser({ userName, userIdForFollowers }) {
  const [follow, setFollow] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [userFollower, setUserFollower] = useState(0);
  const [loading, setLoading] = useState(true);

  let localData = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    setLoading(true);
    async function fetchUserFollowers() {
      let followerResult = await axios.get(
        `${BASE_URL}/follower/getFollowers`,
        {
          params: {
            userId: userIdForFollowers,
          },
        }
      );
      setUserFollower(followerResult.data[0].followers.length);
      if (localData) {
        setFollow(followerResult.data[0].followers.includes(localData.userId));
        setLoading(false);
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
          setLoading(false);
        }
      } catch (err) {
        console.log("Error: Profile can't be feched due to", err);
        setLoading(false);
      }
    }
    fetchUserProfile();
    fetchUserFollowers();
  }, [userName]);

  async function handleFollow(e) {
    e.preventDefault();

    // followed by
    let followerId = localData.userId;

    // request to update the followers of the user
    let result = await axios.put(`${BASE_URL}/follower/setFollower`, {
      userId: userIdForFollowers,
      followerId: followerId,
      follow: follow,
    });
    setUserFollower(result.data[0].followers.length);
    setFollow(!follow);

    try {
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="BlogInfoUser">
      {loading ? (
        <div className="loaderContainer">
          <ReactLoading
            type={"spin"}
            color={"#45aaff"}
            height={50}
            width={50}
          />
          <div>Loading user profile...</div>
        </div>
      ) : (
        <>
          <section className="top">
            <div className="imageContainer">
              <NavLink to={`/profile/${profileData.userName}`}>
                {profileData &&
                profileData.userSocialLinks &&
                profileData.userSocialLinks[2] ? (
                  <Avatar
                    githubHandle={profileData.userSocialLinks[2].slice(
                      profileData.userSocialLinks[2].lastIndexOf("/") + 1
                    )}
                    size={50}
                    round="50px"
                  />
                ) : (
                  <Avatar name={profileData.fullName} size={50} round="50px" />
                )}
              </NavLink>
            </div>
            <div className="userInfoContainer">
              <div className="fullName">
                <NavLink to={`/profile/${profileData.userName}`}>
                  {profileData.fullName}
                </NavLink>
              </div>
              <div className="followers">{userFollower} Followers</div>
            </div>
          </section>
          <section className="middle">
            {localData && localData.userName !== userName && (
              <div className="followButtonContainer" onClick={handleFollow}>
                <button className={!follow ? "follow" : "following"}>
                  {follow ? "Following" : "Follow"}
                </button>
              </div>
            )}
            <div className="socialMediaLinkContainer">
              {profileData.userSocialLinks &&
              profileData.userSocialLinks.length ? (
                <>
                  {profileData.userSocialLinks[0] && (
                    <Link to={profileData.userSocialLinks[0]} target="_blank">
                      <FontAwesomeIcon icon={faLinkedin} />
                    </Link>
                  )}
                  {profileData.userSocialLinks[1] && (
                    <Link to={profileData.userSocialLinks[1]} target="_blank">
                      <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                  )}
                  {profileData.userSocialLinks[2] && (
                    <Link to={profileData.userSocialLinks[2]} target="_blank">
                      <FontAwesomeIcon icon={faGithub} />
                    </Link>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
          </section>
          <div className="middle">
            {profileData && profileData.userBio && (
              <div className="userBio">{profileData.userBio}</div>
            )}
          </div>

          <div className="bottom"></div>
        </>
      )}
    </div>
  );
}

export default BlogInfoUser;
