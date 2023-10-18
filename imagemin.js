import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import ImageminGm from 'imagemin-gm'

const imageminGm = new ImageminGm()

const files = await imagemin(['static/*.{jpg,png}'], {
	destination: 'build/images',
	plugins: [

    imageminGm.resize({ width: 250}),
		imageminJpegtran({ }),
		imageminPngquant({
			quality: [0.6, 0.8]
		})
	]
});

console.log(files);
