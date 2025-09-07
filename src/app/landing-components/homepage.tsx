import { Footer } from "react-day-picker";
import Hader from "./hader";
import Hero from "./hero";
import HeroBG from "./herobackground";
import HowToUse from "./howtouse";
import Reviews from "./reviews";
import StartBtn from "./startBtn";

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
