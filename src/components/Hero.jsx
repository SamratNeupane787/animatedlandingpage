"use client"
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import Image from 'next/image'
import React, { useRef } from 'react'
import { useMediaQuery } from 'react-responsive';

function Hero() {
  const videoRef = useRef()
  const isMobile = useMediaQuery({maxWidth: 767})
  useGSAP(()=>{
    const heroSplit = new SplitText('.title',{type:'chars, words'});
    const paraSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((cha)=>{
      cha.classList.add("text-gradient");
    })
    gsap.from(heroSplit.chars,{
      yPercent:100,
      duration:1.8,
      ease:"expo.out",
      stagger:0.06
    })
    gsap.from(paraSplit.lines,{
      opacity:0,
      yPercent:100,
      duration:1.8,
      ease:"expo.out",
      stagger:0.06,
      delay:1

    })
    gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(
        ".right-leaf",
        {
          y: 200,
        },
        0
      )
      .to(
        ".left-leaf",
        {
          y: -200,
        },
        0
      );

      const startValue = isMobile ? 'top 50%' :' center 60%';
      const endValue = isMobile ? '120% top':'bottom top'

      const tl = gsap.timeline({
        scrollTrigger:{
          trigger:"video",
          start: startValue,
          end: endValue,
          scrub:true,
          pin:true,
        }
      })
      
      videoRef.current.onloadedmetadata = () => {
        tl.to(videoRef.current, {
          currentTime: videoRef.current.duration
        });
      };
  },[])
  return (
    <>
      <section id="hero" className=" noisy">
        <h1 className="title">MOJITO</h1>
        <Image
          src="/images/hero-left-leaf.png"
          alt="heroimg"
          height={96}
          width={96}
          className="left-leaf"
        />
        <Image
          src="/images/hero-right-leaf.png"
          alt="heroimg"
          height={96}
          width={96}
          className="right-leaf"
        />
        <div className=" body">
          <div className=" content">
            <div className=" space-y-5 hidden  md:block">
              <p>Cool .Crisp . Classic</p>
              <p className="subtitle">
                Sip the spirit <br /> of summer
              </p>
            </div>
            <div className="view-cocktails">
              <p className="subtitle">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                natus eius, inventore provident earum consequuntur sequi
                explicabo
              </p>
              <a href='#cocktails'>View Cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className=' video absolute inset-0'>
        <video src='/videos/input.mp4' ref={videoRef} muted playsInline preload='auto'/>
      </div>
    </>
  );
}

export default Hero
