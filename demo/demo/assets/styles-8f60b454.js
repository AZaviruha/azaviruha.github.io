import{i as r}from"./ui-6e300fc6.js";const a={galeryDotSize:10,galleryArrowSize:32,galeryDotGap:6,galleryThumbnailGap:16};r(`
  --galeryDotSize: ${a.galeryDotSize}px;
  --galleryArrowSize: ${a.galleryArrowSize}px;
  --galeryDotGap: ${a.galeryDotGap}px;
  --galleryThumbnailGap: ${a.galleryThumbnailGap}px;

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(4);
    }
  }

  span.cf-ripple {
    position: absolute;
    border-radius: 50%;
    transform: scale(0);
    animation: ripple 600ms linear;
    pointer-events: none;
  }

  .cf-ripple-container-light span.cf-ripple {
    background-color: rgba(255, 255, 255, 0.24);
  }

  .cf-ripple-container-dark span.cf-ripple {
    background-color: rgba(0, 0, 0, 0.075);
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #FAFAFA inset !important;
  }
`);export{a as G};
//# sourceMappingURL=styles-8f60b454.js.map
