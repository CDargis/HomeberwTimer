#!/bin/bash

function compile_frontend () {

  	echo "compiling frontend..."
  	mkdir -p www/css
  	lessc www/less/index.less > www/css/index.css
  	echo "...finished"
}

compile_frontend