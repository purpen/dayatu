
/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId
  , async = require('async')
  , _ = require('underscore')


/**
 * Category
 */
module.exports = Categories = [
    { id: 1, name: '3D', zgname: '3D', state: 1, sort_by: 1 }
  , { id: 2, name: 'Abstract', zgname: '抽象', state: 1, sort_by: 1 }
  , { id: 3, name: 'Animals', zgname: '动物', state: 1, sort_by: 1 }
  , { id: 4, name: 'Anime', zgname: '动漫', state: 1, sort_by: 1 }
  , { id: 5, name: 'Architecture', zgname: '建筑', state: 1, sort_by: 1 }
  , { id: 6, name: 'Asian', zgname: '亚洲', state: 1, sort_by: 1 }
  , { id: 7, name: 'Cartoons', zgname: '卡通', state: 1, sort_by: 1 }
  , { id: 8, name: 'Celebrity', zgname: '明星', state: 1, sort_by: 1 }
  , { id: 9, name: 'City', zgname: '城市', state: 1, sort_by: 1 }
  , { id: 10, name: 'Closeups', zgname: '特写', state: 1, sort_by: 1 }
  , { id: 11, name: 'Comics', zgname: '漫画', state: 1, sort_by: 1 }
  , { id: 12, name: 'Cultures', zgname: '文化', state: 1, sort_by: 1 }
  , { id: 13, name: 'Fashion', zgname: '时尚', state: 1, sort_by: 1 }
  , { id: 14, name: 'Flowers', zgname: '鲜花', state: 1, sort_by: 1 }
  , { id: 15, name: 'Food & Drinks', zgname: '美食', state: 1, sort_by: 1 }
  , { id: 16, name: 'Funny', zgname: '搞笑', state: 1, sort_by: 1 }
  , { id: 17, name: 'Games', zgname: '游戏', state: 1, sort_by: 1 }
  , { id: 18, name: 'Girls', zgname: '美女', state: 1, sort_by: 1 }
  , { id: 19, name: 'Guys', zgname: 'Guys', state: 1, sort_by: 1 }
  , { id: 20, name: 'Logos', zgname: '标志', state: 1, sort_by: 1 }
  , { id: 21, name: 'Movies', zgname: '电影', state: 1, sort_by: 1 }
  , { id: 22, name: 'Music', zgname: '音乐', state: 1, sort_by: 1 }
  , { id: 23, name: 'Sports', zgname: '运动', state: 1, sort_by: 1 }
  , { id: 24, name: 'Textures', zgname: '纹理', state: 1, sort_by: 1 }
  , { id: 25, name: 'Religion', zgname: '宗教', state: 1, sort_by: 1 }
  , { id: 26, name: 'Scenery', zgname: '风景', state: 1, sort_by: 1 }
  , { id: 27, name: 'Space', zgname: '空间', state: 1, sort_by: 1 }
  , { id: 28, name: 'Paintings', zgname: '绘画&插画', state: 1, sort_by: 1 }
  , { id: 29, name: 'photography', zgname: '摄影', state: 1, sort_by: 1 }
]

/**
 * Types
 */
module.exports = Types = [
    { id: 1, name: 'iphone', state: 1, sort_by: 1 }
  , { id: 2, name: 'ipad', state: 1, sort_by: 1 }
]