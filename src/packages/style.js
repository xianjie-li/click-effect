export const style = (base) => {
  /* language=css */
  return `
    .${base} {
      position: relative;
      overflow: hidden;
    }
    
    .${base}.__light .${base}-ripple{
      background: rgba(255,255,255, 0.3);
    }
    
    .${base}.__red .${base}-ripple{
      background: rgba(245, 34, 45, 0.3);
    }
    
    .${base}.__orange .${base}-ripple{
      background: rgba(250, 140, 22, 0.3);
    }
    
    .${base}.__yellow .${base}-ripple{
      background: rgba(250, 219, 20, 0.3);
    }
    
    .${base}.__green .${base}-ripple{
      background: rgba(82, 196, 26, 0.3);
    }
    
    .${base}.__cyan .${base}-ripple{
      background: rgba(19, 194, 194, 0.3);
    }
    
    .${base}.__blue .${base}-ripple{
      background: rgba(24, 144, 255, 0.3);
    }
    
    .${base}.__purple .${base}-ripple{
      background: rgba(114, 46, 209, 0.3);
    }
    
    .${base}-ripple {
      position: absolute;
      border-radius: 50%;
      width: 0;
      height: 0;
      opacity: 1;
      background: rgba(0,0,0,0.14);
      transition: 0.6s ease-out;
      transition-property: transform, opacity;
      transform: scale3d(0, 0, 1);
      pointer-events: none;
    }
  `
};