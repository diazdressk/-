"use strict";

const gulp = require("gulp"); //импортирую пакеты для сборки
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/"; //все будет храниться там

gulp.task("copy-html", () => {  //для отслеживания html файла
    return gulp.src("./src/index.html") //она находится тут
                .pipe(gulp.dest(dist))  //перемещаю в папку dist
                .pipe(browsersync.stream());  // заупскаю браузерсинк,чтобы страница перезагрузилась
});

gulp.task("build-js", () => { //таск для компиляции скриптов
    return gulp.src("./src/js/main.js") //беру главный файл,компилирую
                .pipe(webpack({ //компилирю webpackом
                    mode: 'development',  //компилирую в режиме разработки
                    output: {
                        filename: 'script.js'//сохраняю так
                    },
                    watch: false,
                    devtool: "source-map",//карта проекта,откуда скрипты идут
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',//подключаю babel
                              options: {
                                presets: [['@babel/preset-env', {//пресет env
                                    debug: true,
                                    corejs: 3,//настройки библиотеки corejs для полифилов,3 версия
                                    useBuiltIns: "usage"//анализирует код и подключает только те полифилы,котоыре нужны
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist))
                .on("end", browsersync.reload);//перезагружаю страницу после изменений
});

gulp.task("copy-assets", () => {  
    return gulp.src("./src/assets/**/*.*")  //из папки src беру любые файлы
                .pipe(gulp.dest(dist + "/assets"))  //из папки src беру любые файлы
                .on("end", browsersync.reload);
});

gulp.task("watch", () => {//внутри этого такска запускается отдельный сервер
    browsersync.init({//с помощью browsersync серверит?
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));//запускас вотчтаск чтобы следил за изменениями
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));//при изменении запускает build-js,которая формирует итоговый файл
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));//параллельно запускает все задачи

gulp.task("build-prod-js", () => {//чистовой вариант для продакшена,подключаются разные плагины и тд,компилирует в конце
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));//задача,которая запускается поумолчанию...отслеживает изменения,компилирует все файлы