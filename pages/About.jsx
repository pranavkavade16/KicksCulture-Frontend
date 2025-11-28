const About = () => {
  return (
    <div
      style={{ backgroundColor: "black", minHeight: "100vh", color: "white" }}
    >
      <div className="container py-3">
        <div className="d-flex justify-content-center mb-3">
          <h2 class="lexend-exa">About KicksCulture</h2>
        </div>
        <div className="row">
          <div className="col-5">
            <img
              src="https://static.nike.com/a/images/w_1280,c_limit,q_auto,f_auto/255de165-c28d-4b30-a8d0-762f04b1b9c4/air-jordan-1-low-og-chicago-hq6998-600-release-date.jpg"
              style={{ width: "400px" }}
              alt=""
            />
          </div>
          <div className="col">
            <p>
              Born in 2018, KicksCulture emerged with a vision to create a
              platform for the authentic expression of streetwear culture and
              lifestyle in India. What began as a niche destination for sneaker
              enthusiasts quickly evolved into a cultural movement—one that
              redefined the way a new generation experiences fashion, music, and
              lifestyle.
            </p>
            <p>
              Over the years, KicksCulture has grown beyond being just a sneaker
              hub. Today, it stands as India’s premier lifestyle destination,
              with flagship stores across Mumbai, Delhi, Bengaluru, Hyderabad,
              and Jaipur. Our mission is simple yet powerful: to curate and
              deliver the finest selection of global and homegrown labels,
              blending style with substance.
            </p>
            <p>
              From exclusive sneaker drops to cutting-edge streetwear
              collections, we bring together brands that resonate with
              individuality and creativity. At KicksCulture, we don’t just sell
              products—we celebrate a way of life, empowering communities to
              express themselves through fashion, art, and music.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
