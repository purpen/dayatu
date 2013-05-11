/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId

/**
 * Types
 */
module.exports = WPSize = [
    { id: 1, name: 'iPhone4/4s', width: 320, height: 480 }
  , { id: 2, name: 'iPhone5', width: 640, height: 960 }
  , { id: 3, name: 'xiaomi2', width: 720, height: 1280 }
  , { id: 4, name: 'iPad', width: 1024, height: 1024 }
  , { id: 5, name: '宽屏', width: 1366, height: 768 }
  , { id: 6, name: '宽屏', width: 1440, height: 900 }
  , { id: 7, name: '宽屏', width: 1280, height: 800 }
  , { id: 8, name: '通用', width: 1024, height: 768 }
  , { id: 9, name: '宽屏', width: 1280, height: 1024 }
]