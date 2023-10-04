"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
var _reactSvgPanZoom = require("react-svg-pan-zoom");
var _constants = require("../utils/constants");
function _default(state, action) {
  switch (action.type) {
    case _constants.UPDATE_2D_CAMERA:
      return state.merge({
        viewer2D: action.value
      });
    case _constants.SELECT_TOOL_PAN:
      return state.set('mode', _constants.MODE_2D_PAN);
    case _constants.SELECT_TOOL_ZOOM_IN:
      return state.set('mode', _constants.MODE_2D_ZOOM_IN);
    case _constants.SELECT_TOOL_ZOOM_OUT:
      return state.set('mode', _constants.MODE_2D_ZOOM_OUT);
    case _constants.FIT_SELECTION:
      var viewer2D = state.get('viewer2D');
      var newViewer2D = (0, _reactSvgPanZoom.fitSelection)(viewer2D.toJS(), action.value.x, action.value.y, action.value.width, action.value.height);
      return state.merge({
        viewer2D: newViewer2D
      });
  }
}