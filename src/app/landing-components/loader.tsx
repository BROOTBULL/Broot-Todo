export default function Loader()
{
    return (
    <div className={`w-full h-[100vh] flex justify-center items-center brightness-95 `}>
        <div className="bg-radial from-transparent to-black absolute inset-0 z-100"></div>
      <div className="absolute w-full h-full bg-slate-900 -z-10" />
      <div className="absolute w-50 h-100 bg-slate-900 z-10 mr-70 " />
      <div className="persp">
        <div className="aspact-square size-30 absolute shape rounded-sm border-3 border-l-transparent border-b-transparent border-t-slate-950 border-r-slate-900 bg-slate-300 ml-7 landingloader2 drop-shadow-lg/90" />
        <div className="aspact-square w-13 h-29 ml-20 shape rounded-sm border-3 border-l-transparent border-b-transparent border-t-slate-950 border-r-slate-900 bg-slate-300 mt-21  mr-32 landingloader3 drop-shadow-lg/90" />
      </div>
      <div className="persp absolute ml-18">
        <div className="aspact-square size-10 shape rounded-sm border-3 border-l-transparent border-b-transparent border-t-slate-950 border-r-slate-900 bg-slate-300 mt-13 mb-5 landingloader drop-shadow-lg/90" />
        <div className="aspact-square size-10 shape rounded-sm border-3 border-l-transparent border-b-transparent border-t-slate-950 border-r-slate-900 bg-slate-300 landingloader1 drop-shadow-lg/90" />
      </div>
    </div>
  );
}