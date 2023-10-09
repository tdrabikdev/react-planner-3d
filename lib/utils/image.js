"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveSVGtoPngFile = exports.saveSVGtoPngBase64 = exports.saveSVGtoFile = exports.saveSVGtoBase64 = void 0;
var _browser = require("./browser");
var saveSVGtoBase64 = function saveSVGtoBase64(svgElement) {
  var serializer = new XMLSerializer();
  var svgString = serializer.serializeToString(svgElement);
  var base64Data = btoa(unescape(encodeURIComponent(svgString)));
  return base64Data;
};
exports.saveSVGtoBase64 = saveSVGtoBase64;
var saveSVGtoFile = function saveSVGtoFile(svgElement) {
  var base64Data = saveSVGtoBase64(svgElement);
  var dataURI = "data:image/svg+xml;base64,".concat(base64Data);
  (0, _browser.imageBrowserDownload)(dataURI, 'screenshot.svg');
};
exports.saveSVGtoFile = saveSVGtoFile;
var saveSVGtoPngBase64 = function saveSVGtoPngBase64(svgElement) {
  return new Promise(function (resolve, reject) {
    var base64Data = saveSVGtoBase64(svgElement);
    var dataURI = "data:image/svg+xml;base64,".concat(base64Data);
    var image = new Image();
    image.src = dataURI;
    image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = image.width;
      canvas.height = image.height;
      var context = canvas.getContext('2d');
      context.drawImage(image, 0, 0);
      var pngDataURI = canvas.toDataURL('image/png');
      console.log(pngDataURI);
      resolve(pngDataURI);
    };
    image.onerror = function (err) {
      reject(new Error('Image loading or conversion failed'));
    };
  });
};
exports.saveSVGtoPngBase64 = saveSVGtoPngBase64;
var saveSVGtoPngFile = function saveSVGtoPngFile(svgElement) {
  saveSVGtoPngBase64(svgElement).then(function (pngDataURI) {
    (0, _browser.imageBrowserDownload)(pngDataURI, 'screenshot.png');
  })["catch"](function (err) {
    console.error(err);
  });
};
exports.saveSVGtoPngFile = saveSVGtoPngFile;