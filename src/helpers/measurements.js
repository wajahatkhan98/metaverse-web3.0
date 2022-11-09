const AREA = [1000, 2000, 3000, 4000, 5000];
const PRICE_PER_SQUARE = 10;

const getTotalPrice = (area) => {
    return (area*PRICE_PER_SQUARE)
}

const getPerSqPrice = () => PRICE_PER_SQUARE

const getTotalAreaRandomArea = () => {
    const idx = Math.floor(Math.random() * 4);
    return AREA[idx]
};

export {getTotalPrice, getTotalAreaRandomArea,getPerSqPrice}