import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import { useWindowScroll } from "react-use";
import gsap from "gsap";

const navItems = ["Nexus", "Vault", "Prolouge", "About", "Contact"];

const Navbar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);// Reference to the audio element

  const { y: currentScrllY } = useWindowScroll();// Using react-use to get the current scroll position
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isNavVisible, setIsNavVisible] = useState(true);

  useEffect(() => {
    if (currentScrllY === 0){
        setIsNavVisible(true);
        navContainerRef.current.classList.remove('floating-nav');
    }
    else if (currentScrllY > lastScrollY) {
      // Scrolling down
      setIsNavVisible(false);
      navContainerRef.current.classList.add('floating-nav');
    } else if(  currentScrllY < lastScrollY) {
      // Scrolling up
      setIsNavVisible(true);
      navContainerRef.current.classList.add('floating-nav');

    }

    setLastScrollY(currentScrllY);
    // Update the last scroll position
  
    
  }, [currentScrllY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.1,
    });

  },[isNavVisible]);
  
  const toogleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);

    setIsIndicatorActive((prev) => !prev);
  }

  useEffect(()=>{
    if (isAudioPlaying) {
      audioElementRef.current.play();
    }
    else {
      audioElementRef.current.pause();
    }

  },[isAudioPlaying]);
  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 flex items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="nav-hover-btn">
                  {item}
                </a>
              ))}
            </div>

            <button className="ml-10 flex items-center space-x-0.5" onClick={toogleAudioIndicator}>
              <audio ref={audioElementRef} className="hidden" src="/audio/loop.mp3" loop/>
              {[1,2,3,4].map((bar)=>(
                <div key={bar} className={`indicator-line ${isIndicatorActive ? "active" : ""} `} style={{ animationDelay: `${bar * 0.1}s`}}/>

              ))}
            </button>


          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
