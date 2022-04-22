require('dotenv').config()
/* eslint-disable */
const gulp = require('gulp'),
			sass = require('gulp-sass'),
			autoprefixer = require('gulp-autoprefixer'),
			cssnano = require('gulp-cssnano'),
			plumber = require('gulp-plumber'),
			{ join } = require('path'),
			gPostcss = require('gulp-postcss'),
			purgecss = require('gulp-purgecss'),
			cleanCSS = require('gulp-clean-css'),
			svgSprite = require('gulp-svg-sprites'),
			prettier = require('gulp-prettier'),
			minify = require('gulp-minify'),
			del = require('del'),
			webpack = require('webpack'),
			wStream = require('webpack-stream'),
			browserSync = require('browser-sync'),
			named = require('vinyl-named'),
			wConfig = require('./webpack.config.js'),
			dev = process.env.NODE_ENV !== "production"

/* SCSS Compile */
function css() {
	del.sync(dev ? "src/public" : "src/css")
	const tailwind = require('tailwindcss')
	return gulp.src('./src/scss/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			includePaths: [
				join(__dirname, "src", "scss")
			]
		}).on('error', sass.logError))
		.pipe(gPostcss([
			tailwind(require('./tailwind.config')),
			require('autoprefixer')()
		]))
		.pipe(
			autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
				cascade: true
			})
		)
		// .pipe(cssnano())
		.pipe(gulp.dest(dev ? "public/css" : "src/css"))
		.pipe( browserSync.stream() )
}

/* CSS Purge */
function cssPurge() {
	del.sync('public/css')
	return gulp.src([
			join(__dirname, 'src', 'css', '**', '*.css'),
		])
		.pipe(purgecss({
			content: [
				join(__dirname, 'public', 'js', '**', '*.js'),
				join(__dirname, 'views', '**', '**', '*.pug'),
				join(__dirname, 'public', 'svg', 'symbols.svg')
			],
			defaultExtractor: content => {
				const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || []
				const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || []
				return broadMatches.concat(innerMatches)
			}
		}))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('public/css'))
		.pipe( browserSync.stream() )
}

function moveCSS() {
	return gulp.src([
			join(__dirname, 'node_modules', "swiper", "swiper.min.css"),
			join(__dirname, 'node_modules', "choices.js", "/public/assets/styles/choices.min.css")
		])
		.pipe( gulp.dest( join(__dirname, 'public', 'css')))
		.pipe( browserSync.stream() )
}

/* Compile svg sprite */
function svg() {
	del.sync('public/svg')
	return gulp.src(`public/icons/**/*.svg`)
		.pipe(svgSprite({ mode: "symbols" }))
		.pipe( gulp.dest( join(__dirname, 'public', 'svg') ) )
		.pipe( browserSync.stream() )
}

// Обработка файлов js
function js() {
	del.sync('public/js')
	return gulp.src([ 
			join(__dirname, 'src', 'js', '*.js')
		])
		.pipe( plumber() )
		.pipe( named() )
		.pipe( wStream(wConfig, webpack) )
		.pipe( minify({ ext: { src: '.source.js', min: '.min.js' } }) )
		.pipe( gulp.dest('public/js') )
		.pipe( browserSync.stream() )
}

function stream(done) {
	browserSync.init({
		port: process.env.G_PORT,
		proxy: `http://localhost:${process.env.PORT}`,
		reloadDelay: 1000,
		// open: false
	})
	done();
}

function watch() {

	// Watch SCSS changes
  gulp.watch('src/scss/**/**/*.scss', gulp.series(css, moveCSS));
  // gulp.watch(join(__dirname, "src", "scss", "**", "**", "*.scss"), gulp.series(css, cssPurge, moveCSS));

	// Watch SVG changes
	gulp.watch('public/icons/**/*.svg', svg)

	// Watch JS changes
	gulp.watch('src/js/**/*.js', js)

	// Watch PUG changes 
	// gulp.watch('views/**/**/**/*.pug', gulp.series(cssPurge, moveCSS))

	// Watch server files changes
	let folders = "sequelize|models|middleware|router|common".split("|")
	gulp.watch(folders.map(folder => `${folder}/**/**/**/*.js`)).on("change", browserSync.reload)
	gulp.watch("server.js").on("change", browserSync.reload)
}

exports.watch = gulp.series(stream, watch)
exports.default = gulp.series(css, moveCSS, js, svg, stream, watch)
exports.build = gulp.series(css, cssPurge, moveCSS, js, svg)
/* eslint-enable */