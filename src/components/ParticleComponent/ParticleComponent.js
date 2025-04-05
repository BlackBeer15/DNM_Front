import React, { useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticleComponent = React.memo(() => {
    
    initParticlesEngine(async (engine) => {
        await loadSlim(engine);
    })
  
    const particlesLoaded = (container) => {
      console.log("Particles Loaded:", container);
    };
  
    const options = useMemo(() => ({
      background: {
        color: "#fff",
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: { enable: true, mode: "push" },
          onHover: { enable: true, mode: "repulse" },
        },
        modes: {
          push: { quantity: 4 },
          repulse: { distance: 200, duration: 0.4 },
        },
      },
      particles: {
        color: { value: '#2a60ff' },
        links: {
          color: '#2a60ff',
          distance: 200,
          enable: true,
          opacity: 1,
          width: 3,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: { default: "bounce" },
          random: false,
          speed: 1,
          straight: false,
        },
        number: {
          density: { enable: true, area: 1080 },
          value: 50,
        },
        opacity: {
          value: { min: 0.5, max: 1 },
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 0.1,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 10, max: 20 },
          random: { enable: true },
        },
      },
      detectRetina: true,
    }), []);

  return <Particles  id="tsparticles"  options={options}  particlesLoaded={particlesLoaded}/>;
});

export default ParticleComponent;