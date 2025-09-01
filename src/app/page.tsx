import Footer from "./landing-components/footer";
import Hader from "./landing-components/hader";
import Hero from "./landing-components/hero";
import HeroBG from "./landing-components/herobackground";
import HowToUse from "./landing-components/howtouse";
import Reviews from "./landing-components/reviews";
import StartBtn from "./landing-components/startBtn";

const Homepage = () => {
  return (
    <div className="bg-linear-to-bl from-black via-slate-900 to-black">
      <div>
        <HeroBG />
        <Hader />
        <Hero />
      </div>
      <Reviews />
      <HowToUse />
      <StartBtn />
      <Footer />
    </div>
  );
};
export default Homepage;
