import Hader from "./hader";
import NewHero from "./newHero";
import HeroBG from "./heroBG";
import HowToUse from "./howtouse";
import Reviews from "./reviews";
import StartBtn from "./startBtn";
import HomeWindow from "./mainWindow";
import Footer from "./footer";

const Homepage = () => {
  return (
    <div className="bg-linear-to-bl from-black via-indigo-800/10 to-black">
      <div className="relative">
        <HeroBG />
        <Hader />
        {/* <Hero /> */}
        <NewHero />
        <HomeWindow/>
      </div>
      <Reviews />
      <HowToUse />
      <StartBtn />
      <Footer />
    </div>
  );
};
export default Homepage;
