import React, { useEffect,useState } from 'react'
import logo from "../../assets/logo-infynno-white.svg";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from '../../redux/slices/auth/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const NavbarNew = () => {
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false); 
  // const navigate = useNavigate();
    const { token } = useSelector((state) => ({
    token: state.loginSlice.allData?.token?.access,
  }));
  const navigate = useNavigate()
  useEffect(() => {
  }, [token])

  const toggleClass = () => {
    setIsNavOpen(!isNavOpen);
    const coinsText = document.querySelector("#nav-icon4")
    coinsText?.classList?.toggle("open");
  }

  
  return (
    <div className='fixed w-full z-50'>
    <nav className="flex justify-center w-full max-w-screen bg-[#544BB9] items-center px-4">
      <div className="flex justify-between w-full py-3 max-w-6xl">
        <div className="flex gap-5 items-center justify-center">
        <a href="/">
          <img src={logo} alt="logo" className="w-14 cursor-pointer" />
        </a>
        {/* <a href="/">
          <p className="font-bold text-black text-xl text-transparent bg-clip-text bg-gradient-to-t from-purple-400 to-blue-600 transition duration-[0.4s]">TAGLINE GENERATOR</p>
        </a> */}
        </div>
        <div className="">
          <div className='hidden ms:flex md:hidden w-full h-full'>
          <div id="nav-icon4" onClick={() => toggleClass()}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          </div>
          <div className={isNavOpen ? "flex flex-col absolute w-full h-screen top-[55px] left-0 bg-white z-10 justify-start items-start px-5" : "hidden"}>
            <ul className="flex flex-col gap-5 my-5 items-start justify-between">
            <Link href="/">
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    How it works?
                  </li>
                </Link>
                <Link href="/">
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    Pricing
                  </li>
                </Link>
                {/* <Link href="https://infynno.com/about-us/" target="_blank"> */}
                <button onClick={() => navigate("https://infynno.com/about-us/")} >
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    About us
                  </li>
                  </button>
                {/* </Link> */}
                <Link href="/">
                  <li className="font-normal text-lg text-black hover:text-[#141414] transition duration-[0.4s]">
                    Help
                  </li>
                </Link> 
            </ul>
            {token?
            <button 
            onClick={() => {dispatch(logOut()); setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
            coinsText?.classList?.remove("open");
              navigate("/auth/login")}}
            className='flex gap-2 items-center font-bold text-lg px-3 py-1 rounded-md bg-[#544BB9] text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap'>
              Log out
              <FiLogOut />
            </button> 
            :
              <button onClick={() => {setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
              coinsText?.classList?.remove("open");
              navigate("/auth/register");}} className="font-bold text-lg px-3 py-1 rounded-md bg-[#544BB9] text-white hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none">
                Get Started
              </button>
            }
          </div>
          <ul className="flex items-center justify-center gap-10 w-full h-full cursor-pointer ms:hidden md:flex">
            <div className='flex items-center justify-center gap-5 w-full h-full cursor-pointer'>
              <Link href="/">
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-[#141414] transition duration-[0.4s]">
                  How it works?
                </li>
              </Link>
              <Link href="/">
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-[#141414] transition duration-[0.4s]">
                  Pricing
                </li>
              </Link>
              {/* <Link href="https://infynno.com/about-us/" target="_blank"> */}
              <button onClick={() => navigate("https://infynno.com/about-us/")} >
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-white transition duration-[0.4s]">
                  About us
                </li>
                </button>
              {/* </Link> */}
              <Link href="/">
                <li className="font-bold text-lg text-[#e5e5e5] hover:text-white transition duration-[0.4s]">
                  Help
                </li>
              </Link>
            </div>
            {/* {token?
            <button 
            onClick={() => dispatch(logOut())}
            className='font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap'>Log out</button> 
            :
            <Link href="/auth/register">
              <li className="font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap">
                Get Started
              </li>
            </Link>} */}
              {token?
            <button 
            onClick={() => {dispatch(logOut()); setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
            coinsText?.classList?.remove("open");
              navigate("/auth/login")}}
            className='flex gap-2 items-center font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap'>
              Log out
              <FiLogOut />
            </button> 
            :
              <button onClick={() => {setIsNavOpen(false);
              const coinsText = document.querySelector("#nav-icon4")
              coinsText?.classList?.remove("open");
              navigate("/auth/register");}} className="font-bold text-lg px-3 py-1 rounded-md bg-white text-[#544BB9] hover:text-[#7f8389] transition duration-[0.4s] whitespace-nowrap list-none">
                Get Started
              </button>
            }
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default NavbarNew