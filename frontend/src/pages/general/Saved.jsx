import { Bookmark, ChevronLeft, Search } from "lucide-react";
import { Link } from "react-router-dom";
import BottomNav from "../../components/BottomNav";

const Saved = () => {
  const savedItems = JSON.parse(
    localStorage.getItem("foodreels-saved") || "[]",
  );

  return (
    <main className="account-page saved-page">
      <header className="account-header">
        <Link className="icon-button" to="/" aria-label="Back to home">
          <ChevronLeft size={21} />
        </Link>
        <span className="account-header-title">Saved reels</span>
        <button
          className="icon-button"
          type="button"
          aria-label="Search saved reels"
        >
          <Search size={19} />
        </button>
      </header>
      <section className="saved-content" aria-labelledby="saved-title">
        <div className="saved-heading">
          <div>
            <p className="eyebrow">Your collection</p>
            <h1 id="saved-title">Worth another bite.</h1>
          </div>
          <span className="saved-count">{savedItems.length} saved</span>
        </div>
        {savedItems.length ? (
          <div className="saved-grid">
            {savedItems.map((item) => (
              <article className="saved-card" key={item.id}>
                <div
                  className="saved-card-art"
                  style={{ background: item.color || "#e16b3a" }}
                >
                  <Bookmark size={22} fill="currentColor" />
                </div>
                <div>
                  <strong>{item.name}</strong>
                  <span>{item.partner}</span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-saved">
            <Bookmark size={28} />
            <h2>Your saved reels will land here.</h2>
            <p>
              Tap the bookmark on a reel whenever something catches your eye.
            </p>
            <Link className="text-link" to="/">
              Explore reels <span aria-hidden="true">↗</span>
            </Link>
          </div>
        )}
      </section>
      <BottomNav />
    </main>
  );
};

export default Saved;
