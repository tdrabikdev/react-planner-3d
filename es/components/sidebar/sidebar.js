import React from 'react';
import PropTypes from 'prop-types';
import PanelElementEditor from './panel-element-editor/panel-element-editor';
import PanelGroupEditor from './panel-group-editor';
import PanelMultiElementsEditor from './panel-element-editor/panel-multi-elements-editor';
import PanelLayers from './panel-layers';
import PanelGuides from './panel-guides';
import PanelGroups from './panel-groups';
import PanelLayerElements from './panel-layer-elements';
import * as SharedStyle from '../../styles/shared-style';
import If from '../../utils/react-if';
var STYLE = {
  display: 'block',
  borderRadius: '10px',
  backgroundColor: SharedStyle.PRIMARY_COLOR.main,
  overflowY: 'auto',
  overflowX: 'hidden',
  paddingBottom: '20px'
};
var sortButtonsCb = function sortButtonsCb(a, b) {
  if (a.index === undefined || a.index === null) {
    a.index = Number.MAX_SAFE_INTEGER;
  }
  if (b.index === undefined || b.index === null) {
    b.index = Number.MAX_SAFE_INTEGER;
  }
  return a.index - b.index;
};
var mapButtonsCb = function mapButtonsCb(el, ind) {
  return /*#__PURE__*/React.createElement(If, {
    key: ind,
    condition: el.condition,
    style: {
      position: 'relative'
    }
  }, el.dom);
};
export default function Sidebar(_ref) {
  var state = _ref.state,
    sidebarComponents = _ref.sidebarComponents;
  var selectedLayer = state.getIn(['scene', 'selectedLayer']);

  //TODO change in multi-layer check
  var selected = state.getIn(['scene', 'layers', selectedLayer, 'selected']);
  var multiselected = selected.lines.size > 1 || selected.items.size > 1 || selected.holes.size > 1 || selected.areas.size > 1 || selected.lines.size + selected.items.size + selected.holes.size + selected.areas.size > 1;
  var selectedGroup = state.getIn(['scene', 'groups']).findEntry(function (g) {
    return g.get('selected');
  });
  var sorter = [{
    index: 0,
    condition: true,
    dom: /*#__PURE__*/React.createElement(PanelGuides, {
      state: state
    })
  }, {
    index: 1,
    condition: true,
    dom: /*#__PURE__*/React.createElement(PanelLayers, {
      state: state
    })
  }, {
    index: 2,
    condition: true,
    dom: /*#__PURE__*/React.createElement(PanelLayerElements, {
      mode: state.mode,
      layers: state.scene.layers,
      selectedLayer: state.scene.selectedLayer
    })
  }, {
    index: 3,
    condition: true,
    dom: /*#__PURE__*/React.createElement(PanelGroups, {
      mode: state.mode,
      groups: state.scene.groups,
      layers: state.scene.layers
    })
  }, {
    index: 4,
    condition: !multiselected,
    dom: /*#__PURE__*/React.createElement(PanelElementEditor, {
      state: state
    })
  },
  //{ index: 5, condition: multiselected, dom: <PanelMultiElementsEditor state={state} /> },
  {
    index: 6,
    condition: !!selectedGroup,
    dom: /*#__PURE__*/React.createElement(PanelGroupEditor, {
      state: state,
      groupID: selectedGroup ? selectedGroup[0] : null
    })
  }];
  sorter = sorter.concat(sidebarComponents.map(function (Component, key) {
    return Component.prototype ?
    //if is a react component
    {
      condition: true,
      dom: /*#__PURE__*/React.createElement(Component, {
        state: state,
        key: key
      })
    } : {
      //else is a sortable toolbar button
      index: Component.index,
      condition: Component.condition,
      dom: /*#__PURE__*/React.createElement(Component.dom, {
        state: state,
        key: key
      })
    };
  }));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      width: 256,
      right: 5,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 9999
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: STYLE,
    onKeyDown: function onKeyDown(event) {
      return event.stopPropagation();
    },
    onKeyUp: function onKeyUp(event) {
      return event.stopPropagation();
    },
    className: "sidebar"
  }, sorter.sort(sortButtonsCb).map(mapButtonsCb)));
}
Sidebar.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};