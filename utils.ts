/** https://developer.themoviedb.org/docs/image-basics */
export const makeImgPath = (img: string, width: string = "w500") => (
    `https://image.tmdb.org/t/p/${width}${img}`
);