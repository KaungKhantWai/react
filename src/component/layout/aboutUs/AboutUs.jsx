import "./AboutUs.css";
import aboutBackground from "../../../assets/images/carousel/2.jpg";

function AboutUs() {
  return (
    <section
      className="about-us"
      id="about"
      aria-labelledby="about-us-title"
      style={{ backgroundImage: `url(${aboutBackground})` }}
    >
      <div className="about-us__content">
        <h2 id="about-us-title">About Us</h2>
        <p>
          MCALDF delivers community-focused legal aid, advocacy, and education
          so everyone can access justice with confidence.
        </p>
        <button className="about-us__button" type="button">
          Read More
        </button>
      </div>
    </section>
  );
}

export default AboutUs;
