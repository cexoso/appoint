'use strict'
var gulp = require('gulp'),
connect = require('gulp-connect'),
jsmin = require('gulp-jsmin'),
rename=require('gulp-rename'),

sass = require("gulp-sass"),
chokidar = require('chokidar');
var httpProxy = require('http-proxy');
var Path=require('path');
var proxy = httpProxy.createProxyServer({});
proxy.on('error', function (err, req, res) {
    console.log(err);
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    res.end(err+"");
});

var webpack = require('gulp-webpack');
function delay(func){
    var time=50;
    var t=null;    
    if(func instanceof Function){
        return function(){                    
            if(t){
                clearTimeout(t);
            }            
            t=setTimeout(func,time);            
        }
    }else{
        throw new Error('func should be a function');
    }
};



gulp.task('server',['scss:watch'],
function() {
    connect.server({
        root: ['app', 'bower_components'],
        livereload: true,
        port: 80,
        middleware: function (connect, opt) {
          return [function (req, res, next) {
            next();
          }]
        }//end of middleware
    });
    var html = "";//'app/**/*.html';
    var css="";//'app/**/*.css';
    var js='app/js/*.js';
    var njs='!app/js/bundle.js';
    var delayFunc=delay(function(){
        console.log('reload');
        gulp.src('./app/index.html').pipe(connect.reload());
    });
    chokidar.watch([].concat(css,js,njs,html))
    .on('all',function(d,d1){
        var path=String.prototype.toLowerCase.call(Path.extname(d1));        
        if(path=='.js'){            
            gulp.src('app/js/app.js')
            .pipe(webpack())
            .pipe(rename('bundle.js'))
            .pipe(gulp.dest('app/'))
            .on('end',function(d){                
                delayFunc();
            })
            .on('error',function(d){
                console.log(d);
            });
        }else{            
            delayFunc();
        }
        
    })
});

gulp.task('default', ['server']);

var scssCompile = (function () {
    var arr = [];
    var t = null;
    var timeout = 50;
    return function (csspath) {
        if(csspath=="app\\css\\base.scss"){
            return;
        }
        if (t) {
            clearTimeout(t);
        }
        if (arr.indexOf(csspath) == -1) {
            arr.push(csspath);
        }
        t = setTimeout(function () {
            var st = new Date();
            gulp.src(arr, {
                    base: '.'
                })
                .pipe(sass()
                    .on('error', sass.logError))
                // .pipe(autoprefixer({
                //     browsers: ['last 2 versions']
                // }))
                .pipe(rename(function (p) {
                    p.extname = ".css";
                }))
                .pipe(gulp.dest('./'));
            var et = new Date();
            console.log(et - st + 'ms for compile ' + arr.length + ' sass');
            arr.length = 0;
        }, timeout);
    }
})();

function scssRemove(csspath) {
    var csspath = path.dirname(csspath) + '\\' + path.basename(csspath, 'scss') + 'css';
    gulp.src(csspath)
        .pipe(rimraf({
            force: true
        }));
}
   
gulp.task('scss:watch', function () {
    chokidar.watch('app/**/*.scss')
        .on('add', function (path) {
            scssCompile(path);
        })
        .on('change', function (path) {
            scssCompile(path);
        })
        .on('unlink', scssRemove);
});