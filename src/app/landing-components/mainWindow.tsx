export default function HomeWindow()
{
    return(<div className="h-80 lg:h-160 w-full flex justify-center mx-auto items-center px-2">

  <video
  className="w-300 border-2 border-slate-600 drop-shadow-[0_0_35px_rgb(100_100_250_/0.4)] rounded-xl shadow-lg"
  src="/media/hero/tutorial.mp4"
  autoPlay
  loop               
  playsInline   // prevents full-screen auto behavior on mobile
  controls      
  preload="auto" 
/>
   
   </div>)
}