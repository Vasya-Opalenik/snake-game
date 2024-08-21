const unitSize = window.innerWidth > 560 ? 25 : 15;
const velocity = window.innerWidth > 560 ? 25 : 15;
const borderDimensions = window.innerWidth > 560 ? {
    width: 500,
    height: 500,
} : {width: 300, height: 300};

export {unitSize, velocity, borderDimensions};