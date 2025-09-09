import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className="bg-slate-700 w-[95%] h-0.5 rounded-full justify-self-center flex " />
      <div className="flex flex-col items-center md:px-16 px-5 h-fit md:h-60 py-1 md:py-5">
        <div className="flex md:flex-row flex-col justify-between w-full">
          <div className="flex flex-col">
            <div className="text-base lg:text-3xl font-bold text-slate-300 cursor-default flex flex-row items-end md:gap-2">
                <Image src="/media/BrootW.png" className="h-8 w-6" alt="Logo" width={30} height={30} />
                <div className="mt-4">TodoList</div></div>
            <div className="text-[13px] lg:text-sm md:max-w-80 md:my-6 my-3">
              Join millions of people who organize work and life with Todoist.
            </div>
          </div>

          <div className=" flex flex-row md:gap-8 justify-between">
            <div className="flex flex-col lg:m-2 gap-3">
              <div className="text-sm lg:text-xl font-bold text-indigo-300 cursor-default">Features</div>
              <div className="cursor-pointer text-[13px] lg:text-lg hover:bg-slate-800 rounded-lg p-1">How it works</div>
              <div className="cursor-pointer text-[13px] lg:text-lg hover:bg-slate-800 rounded-lg p-1">About Us</div>
              <div className="cursor-pointer text-[13px] lg:text-lg hover:bg-slate-800 rounded-lg p-1">Pricing</div>
            </div>
            <div className="flex flex-col lg:m-2 gap-3">
              <div className="text-sm lg:text-xl font-bold text-indigo-300 cursor-default">Contact Us</div>
              <div className=" text-[13px] lg:text-lg flex flex-row items-center p-1 cursor-pointer hover:bg-slate-800 rounded-lg">
                <Image className="invert size-4" src="/media/git.png" height={20} width={20} alt=""/>
                 GitHub
              </div>
              <div className=" text-[13px] lg:text-lg flex flex-row items-center p-1 cursor-pointer hover:bg-slate-800 rounded-lg">
                <Image className="invert size-4 m-0.5" src="/media/x.png" height={13} width={13} alt=""/>
                 Twitter
              </div>
              <div className=" text-[13px] lg:text-lg flex flex-row items-center p-1 cursor-pointer hover:bg-slate-800 rounded-lg">
                <Image className="m-0.5 size-4" src="/media/linkedin.png" height={13} width={13} alt=""/>
                 Linkedin
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-700 w-full h-[1px] rounded-full " />

      <div className="flex flex-row justify-center w-full text-[10px]">
        <div>Security</div> | <div>Privacy</div> | <div>Terms </div> © BrootBull
      </div>
    </>
  );
}
