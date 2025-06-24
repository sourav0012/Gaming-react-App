import React, {  useEffect, useRef, useState } from 'react'
import Button from './Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TiLocationArrow } from "react-icons/ti";
import { ScrollTrigger } from "gsap/all";


gsap.registerPlugin(ScrollTrigger);


const Hero = () => {

  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);


  const totalVideos = 4; // Assuming you have 4 videos to load
  const nextVideoRef= useRef(null);// Reference to the next video element

  const handelVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
    
  };// Function to handle video load event
// Calculate the index of the next video to play
// If the current index is the last video, it will loop back to the first video
  const upcomingVideosIndex = (currentIndex % totalVideos)+1;

  useEffect(() => {
    if(loadedVideos === totalVideos-1){
      setIsLoading(false); // Set loading to false when all videos are loaded
    }
    
  
  }, [loadedVideos])
  

  const handleMiniVideoClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcomingVideosIndex);
  };// Function to handle click on the mini video as it will change the current video index

  useGSAP(()=>{
    if(hasClicked){
      gsap.set('#next-video', {visibility: 'visible'}); // Make the next video visible

      gsap.to('#next-video', {
        transformOrigin: 'center center',
        scale: 1,
        width: '100%',
        height: '100%',
        duration: 1,
        ease: 'power1.inOut',
        onStart:()=>nextVideoRef.current.play(), // Play the next video when the animation starts
      })

      gsap.from('#current-video', {
        transformOrigin: 'center center',
        scale:0,
        duration: 1.5,
        ease: 'power1.inOut',  
      })
    }
  },{dependencies:[currentIndex],revertOnUpdate: true})


  useGSAP(()=>{
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    })

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
        
      }
    })

  })

  

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;// Function to get the video source based on the index



  return (
    <div className='relative h-dvh w-screen overflow-hidden'>
      { isLoading && (
        <div className='flex-center absolute z-[100] h-dvh w-screen bg-blue-50 '>
          <div className='three-body'>
            <div className='three-body__dot'/>
            <div className='three-body__dot'/>
            <div className='three-body__dot'/>
          </div>
        </div>
      )}
        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div>
                <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                  <div onClick={handleMiniVideoClick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                    <video
                    ref={nextVideoRef} // Reference to the next video element
                    src={getVideoSrc(upcomingVideosIndex)}// Get the source for the next video
                    loop
                    muted
                    id='current-video'
                    className='size-64 origin-center scale-150 object-cover object-center'
                    onLoadedData={handelVideoLoad}// Handle video load event
                    />
                  </div>

                </div>
                <video
                ref={nextVideoRef}
                src={getVideoSrc(currentIndex)} // Get the source for the current video
                loop
                muted
                id='next-video'
                className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                onLoadedData={handelVideoLoad} 
                
                />

                <video
                src={getVideoSrc(currentIndex===totalVideos-1 ? 1 : currentIndex)}
                autoPlay
                loop
                muted
                className='absolute left-0 top-0 size-full object-cover object-center'
                onLoadedData={handelVideoLoad}
                />
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 '>
              G<b>a</b>ming
            </h1>

            <div className='absolute left-0 top-0 z-40 size-full '>
              <div className='mt-24 px-5 sm:px-10'>
                <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b><b>e</b></h1>

                <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter The MetaGame <br/> Unleash The Play Economy </p>

                <Button id='watch-tariler' title='Watch Trailer' leftIcon={<TiLocationArrow />} containerClass='!bg-yellow-300 flex-center gap-1'/>

              </div>
            </div>
        </div>
        
        <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black '>
              G<b>a</b>ming
            </h1> {/*this h1 is for the black text on the right side of the video, it is a duplicate of the one above but with a different color*/}
    </div>
  ) 
}

export default Hero