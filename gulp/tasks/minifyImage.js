const { src, dest } = require('gulp');
const imagemin = require('gulp-imagemin'); // gulp plugin for imagemin
const imageminPngquant = require('imagemin-pngquant'); // imagemin plugin for pnguant, more options on https://www.npmjs.com/package/imagemin-pngquant
const imageminMozjpeg = require('imagemin-mozjpeg'); // imagemin plugin for mozjpeg, more options on https://www.npmjs.com/package/imagemin-mozjpeg

module.exports = function minifyImage() {
  src('src/image/*').pipe(
    imagemin(
      [
        imageminMozjpeg({ quality: 75, progressive: true }),
        imageminPngquant({ speed: 10, strip: true }),
      ],
      { verbose: true }
    ).pipe(dest('dist/image'))
  );
};
