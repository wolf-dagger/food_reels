import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import BottomNav from "../../components/BottomNav";

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

const getCount = (reel, field, fallback = 0) =>
  Number.isFinite(reel[field]) ? reel[field] : fallback;

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [liked, setLiked] = useState(() => new Set());
  const [saved, setSaved] = useState(() => new Set());
  const feedRef = useRef(null);
  const videoRefs = useRef(new Map());

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
        console.log(res.data);
        setVideos(res.data.foodItems);
      })
      .catch(() => setVideos([]));
  }, []);

  const toggleSaved = (reel) => {
    const next = new Set(saved);
    if (next.has(reel._id)) next.delete(reel._id);
    else next.add(reel._id);
    setSaved(next);
    const savedItems = videos
      .filter((item) => next.has(item._id))
      .map((item) => ({
        id: item._id,
        name: item.name,
        partner: getPartnerName(item) || "Food partner",
        color: "#e16b3a",
      }));
    localStorage.setItem("foodreels-saved", JSON.stringify(savedItems));
  };

  async function handleLike(item) {
    const response = await axios.post(
      "http://localhost:3000/api/food/like",
      {
        foodId: item._id,
      },
      {
        withCredentials: true,
      },
    );

    if (response.data.like) {
      setLiked((prev) => new Set(prev).add(item._id));
    } else {
      setLiked((prev) => {
        const next = new Set(prev);
        next.delete(item._id);
        return next;
      });
    }
  }

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
              const likeCount = getCount(reel, "likeCount", reel.likeCount);
              const saveCount = getCount(reel, "saveCount", 20);
              const commentCount = getCount(reel, "commentCount", 12);
              const shareCount = getCount(reel, "shareCount", 8);

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
                  <aside className="reel-actions" aria-label="Reel actions">
                    <button
                      className={`reel-action ${liked.has(reel._id) ? "is-active" : ""}`}
                      type="button"
                      onClick={() => handleLike(reel)}
                      aria-label="Like reel"
                    >
                      <Heart
                        size={28}
                        fill={liked.has(reel._id) ? "currentColor" : "none"}
                      />
                      <span>{likeCount + (liked.has(reel._id) ? 1 : 0)}</span>
                    </button>
                    <button
                      className={`reel-action ${saved.has(reel._id) ? "is-active" : ""}`}
                      type="button"
                      onClick={() => toggleSaved(reel)}
                      aria-label="Save reel"
                    >
                      <Bookmark
                        size={27}
                        fill={saved.has(reel._id) ? "currentColor" : "none"}
                      />
                      <span>{saveCount + (saved.has(reel._id) ? 1 : 0)}</span>
                    </button>
                    <button
                      className="reel-action"
                      type="button"
                      aria-label="Comment on reel"
                    >
                      <MessageCircle size={27} />
                      <span>{commentCount}</span>
                    </button>
                    <button
                      className="reel-action reel-share"
                      type="button"
                      aria-label="Share reel"
                    >
                      <Share2 size={23} />
                      <span>{shareCount}</span>
                    </button>
                  </aside>
                </>
              );
            })()}
          </article>
        ))}
      </section>
      <BottomNav />
    </main>
  );
};

export default Home;
