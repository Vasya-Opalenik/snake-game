const unitSize = window.innerWidth > 560 ? 25 : (window.innerWidth - 20) / 20;
const velocity = window.innerWidth > 560 ? 25 : (window.innerWidth - 20) / 20;
const borderDimensions = window.innerWidth > 560 ? {
    width: 500,
    height: 500,
} : {width: (window.innerWidth - 20), height: (window.innerWidth - 20)}

export {unitSize, velocity, borderDimensions};