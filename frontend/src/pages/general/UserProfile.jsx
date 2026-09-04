import { Camera, ChevronLeft, LogOut, Save } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

const savedProfile = JSON.parse(
  localStorage.getItem("foodreels-profile") || "null",
);

const UserProfile = () => {
  const [profile, setProfile] = useState(
    savedProfile || {
      fullName: "Alex Morgan",
      email: "alex.morgan@email.com",
      bio: "Always looking for the next delicious thing.",
    },
  );
  const [status, setStatus] = useState("");

  const updateField = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
    setStatus("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem("foodreels-profile", JSON.stringify(profile));
    setStatus("Profile updated");
  };

  return (
    <main className="account-page">
      <header className="account-header">
        <Link className="icon-button" to="/" aria-label="Back to home">
          <ChevronLeft size={21} />
        </Link>
        <span className="account-header-title">Your profile</span>
        <button className="icon-button" type="button" aria-label="Log out">
          <LogOut size={19} />
        </button>
      </header>

      <section className="account-content" aria-labelledby="profile-title">
        <div className="profile-hero">
          <div className="user-avatar">AM</div>
          <button
            className="avatar-edit"
            type="button"
            aria-label="Change profile photo"
          >
            <Camera size={16} />
          </button>
          <p className="eyebrow">Food explorer</p>
          <h1 id="profile-title">Make it yours.</h1>
          <p className="profile-intro">
            Keep your details fresh and your favourite finds close.
          </p>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              name="fullName"
              value={profile.fullName}
              onChange={updateField}
            />
          </label>
          <label>
            Email address
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={updateField}
            />
          </label>
          <label>
            About you
            <textarea name="bio" value={profile.bio} onChange={updateField} />
          </label>
          <button className="primary-button" type="submit">
            <Save size={17} /> Save changes
          </button>
          {status && (
            <p className="form-status" role="status">
              {status}
            </p>
          )}
        </form>
      </section>
      <BottomNav />
    </main>
  );
};

export default UserProfile;
