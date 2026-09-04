import { Link, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const { state } = useLocation();
  const businessName =
    profile?.buisnessName || state?.businessName || id || "Business Name";

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/foodpartner/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setProfile(res.data.foodPartner);
        setVideos(res.data.foodPartner.foodItems);
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Unable to load profile");
      });
  }, [id]);

  return (
    <main className="profile-page">
      <header className="profile-header">
        <Link className="brand brand-dark" to="/">
          <span className="brand-mark">f</span>
          <span>foodreels</span>
        </Link>
        <Link className="profile-back" to="/">
          <span aria-hidden="true">&#8592;</span> Back to reels
        </Link>
      </header>

      <section className="profile-card" aria-labelledby="profile-business-name">
        <div className="profile-summary">
          <div className="profile-picture" aria-label="Profile picture">
            <img
              className="profile-picture"
              src="../../../public/profile pic.jpg"
              alt="avatar"
            />
          </div>

          <div className="profile-fields">
            <h1 id="profile-business-name">{businessName}</h1>
            <p className="profile-address">{profile?.address}</p>
          </div>
        </div>

        {error && <p role="alert">{error}</p>}

        <div className="profile-stats">
          <div className="profile-stat">
            <strong>{profile?.totalMeals}</strong>
            <span>Total Meals</span>
          </div>
          <div className="profile-stat">
            <strong>{profile?.customerServed}</strong>
            <span>Customer Served</span>
          </div>
        </div>

        <div className="profile-divider" />

        <div className="profile-video-grid" aria-label="Food videos">
          {videos.map((v) => (
            <div className="profile-video" key={v._id}>
              <video
                className="profile-video-player"
                src={v.video}
                muted
                autoPlay
                loop
                playsInline
              ></video>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Profile;
