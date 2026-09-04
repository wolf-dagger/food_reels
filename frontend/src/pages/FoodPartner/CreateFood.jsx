import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../../components/AuthLayout";

const CreateFood = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    video: null,
  });
  const [videoPreview, setVideoPreview] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const videoPreviewRef = useRef("");
  const videoInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      if (videoPreviewRef.current) URL.revokeObjectURL(videoPreviewRef.current);
    };
  }, []);

  const setVideoFile = (video) => {
    if (!video) return;
    if (videoPreviewRef.current) URL.revokeObjectURL(videoPreviewRef.current);

    const previewUrl = URL.createObjectURL(video);
    videoPreviewRef.current = previewUrl;
    setVideoPreview(previewUrl);
    setFormData((current) => ({ ...current, video }));
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === "video") {
      setVideoFile(files[0]);
      return;
    }

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleVideoDrop = (event) => {
    event.preventDefault();
    const video = event.dataTransfer.files[0];

    if (video?.type.startsWith("video/")) {
      setVideoFile(video);
    }
  };

  const handleChangeVideo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    videoInputRef.current?.click();
  };

  const handleRemoveVideo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (videoPreviewRef.current) URL.revokeObjectURL(videoPreviewRef.current);
    videoPreviewRef.current = "";
    setVideoPreview("");
    setFormData((current) => ({ ...current, video: null }));
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const data = new FormData();
    data.append("video", formData.video);
    data.append("name", formData.name);
    data.append("description", formData.description);

    try {
      await axios.post("http://localhost:3000/api/food/", data, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to create food reel");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout accountType="foodpartner">
      <div className="auth-heading">
        <p className="eyebrow">Food reel</p>
        <h2>Create something delicious</h2>
        <p>Give your next signature dish a place in the spotlight.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Food video
          <span
            className={`video-upload ${formData.video ? "has-video" : ""}`}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleVideoDrop}
          >
            <input
              ref={videoInputRef}
              className="video-upload-input"
              type="file"
              name="video"
              accept="video/*"
              onChange={handleChange}
              required
            />
            <span className="video-upload-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 32V8m0 0-8 8m8-8 8 8M10 27v7a6 6 0 0 0 6 6h16a6 6 0 0 0 6-6v-7"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="video-upload-copy">
              <strong>
                {formData.video ? formData.video.name : "Drop your video here"}
              </strong>
              <small>
                {formData.video
                  ? `${(formData.video.size / (1024 * 1024)).toFixed(1)} MB selected`
                  : "or click to browse · MP4, MOV up to 500 MB"}
              </small>
            </span>
            {!formData.video && (
              <span className="video-upload-action">Choose video</span>
            )}
          </span>
          {formData.video && (
            <>
              <video
                className="video-upload-preview"
                src={videoPreview}
                controls
                muted
                preload="metadata"
              />
              <span className="video-upload-controls">
                <button type="button" onClick={handleChangeVideo}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M20 14a8 8 0 1 1-2.34-5.66M20 4v5h-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Change video
                </button>
                <button type="button" onClick={handleRemoveVideo}>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="m7 7 10 10M17 7 7 17"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  Remove video
                </button>
              </span>
            </>
          )}
        </label>
        <label>
          Food name
          <input
            type="text"
            name="name"
            placeholder="e.g. Smoky truffle pasta"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description
          <textarea
            name="description"
            placeholder="Tell people what makes this dish special"
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </label>

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Publishing..." : "Publish food reel"}
        </button>
      </form>

      <p className="auth-switch">
        <Link to="/">Back to food reels</Link>
      </p>
    </AuthLayout>
  );
};

export default CreateFood;
