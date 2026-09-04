import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const getProfilePath = (reel) => {
  const partnerId =
    typeof reel.foodPartner === "object"
      ? reel.foodPartner?._id
      : reel.foodPartner;

  if (!partnerId) return "/";

  return `/foodpartner/${encodeURIComponent(partnerId)}`;
};

const getPartnerName = (reel) =>
  typeof reel.foodPartner === "object"
    ? reel.foodPartner?.buisnessName
    : undefined;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const feedRef = useRef(null);
  const videoRefs = useRef(new Map());

  useEffect(() => {}, []);

  useEffect(() => {
    if (!videos.length || !feedRef.current) return undefined;

    const visibleReels = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleReels.set(
            entry.target.dataset.reelId,
            entry.intersectionRatio,
          );
        });

        const mostVisibleReel = [...visibleReels.entries()].reduce(
          (mostVisible, current) =>
            current[1] > (mostVisible?.[1] ?? 0) ? current : mostVisible,
          null,
        );

        if (mostVisibleReel) setActiveVideoId(mostVisibleReel[0]);
      },
      {
        root: feedRef.current,
        threshold: Array.from({ length: 11 }, (_, index) => index / 10),
      },
    );

    feedRef.current.querySelectorAll(".reel").forEach((reel) => {
      observer.observe(reel);
    });

    return () => observer.disconnect();
  }, [videos]);

  useEffect(() => {
    videoRefs.current.forEach((video, videoId) => {
      if (videoId === activeVideoId) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeVideoId]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/food/", { withCredentials: true })
      .then((res) => {
        setVideos(res.data.foodItems);
      });
  }, []);

  return (
    <main className="reels-page">
      <header className="reels-header">
        <Link className="brand reels-brand" to="/">
          <span className="brand-mark">f</span>
          <span>foodreels</span>
        </Link>
        <span className="reels-header-label">Find your next favourite</span>
      </header>

      <section className="reels-feed" ref={feedRef} aria-label="Food reels">
        {videos.map((reel) => (
          <article className="reel" data-reel-id={reel._id} key={reel._id}>
            {(() => {
              const partnerName = getPartnerName(reel) || "Food partner";

              return (
                <>
                  <video
                    className="reel-video"
                    ref={(video) => {
                      if (video) videoRefs.current.set(reel._id, video);
                      else videoRefs.current.delete(reel._id);
                    }}
                    src={reel.video}
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    aria-label={`${partnerName}: ${reel.name}`}
                  />
                  <div className="reel-shade" />
                  <div className="reel-content">
                    <p className="reel-description">{reel.name}</p>
                    <Link
                      className="visit-store"
                      state={{ businessName: partnerName }}
                      to={getProfilePath(reel)}
                    >
                      Visit store <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                  <span className="reel-store">{partnerName}</span>
                </>
              );
            })()}
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
