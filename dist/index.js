'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = pdfToHTML;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pdfToHTML(_ref) {
  var pdfDocument = _ref.pdfDocument;

  var children = pdfDocument.map(pdfStructureToHTMLComponent);

  return Div({}, children);
}

function Div(props, children) {
  return createElement('div', props, children);
}

function Paragraph(props, children) {
  return createElement('p', pdfPropsToHTMLAttrs(props), children);
}

function Span(props, children) {
  return createElement('span', pdfPropsToHTMLAttrs(props), children);
}

function HtmlGrid(props, children) {
  var gridSize = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

  return Div({
    class: 'ui ' + (props.size ? gridSize[props.size - 1] + ' columns' : '') + ' grid'
  }, children);
}

function pdfStructureToHTMLComponent(component) {
  if (_lodash2.default.isArray(component)) {
    return Div({}, pdfStructureToHTMLComponent(component));
  }

  if (_lodash2.default.isString(component)) {
    return Paragraph({}, [component]);
  }

  if (_lodash2.default.isString(component.text)) {
    return Paragraph(component, [component.text]);
  }

  if (_lodash2.default.isArray(component.text)) {
    return Paragraph(component, component.text.map(function (text) {
      return Span(text, [text.text || text]);
    }));
  }

  if (component.table) {
    var children = component.table.body.map(function (row) {
      return Div({
        class: 'row'
      }, row.map(function (column) {
        return Div({
          class: 'column'
        }, [pdfStructureToHTMLComponent(column)]);
      }));
    });

    return HtmlGrid({ size: component.table.body[0].length }, children);
  }

  if (component.stack) {
    return Div({
      class: 'ui sixteen column wide'
    }, component.stack.map(function (segment) {
      return Div({
        class: 'ui sixteen column wide'
      }, [pdfStructureToHTMLComponent(segment)]);
    }));
  }
}

function createElement(tagName, htmlAttrs, children) {
  var tag = document.createElement(tagName);

  // Append children
  children.forEach(function (child) {
    if (_lodash2.default.isString(child)) {
      tag.innerHTML += child.replace(/\n/g, '<br/>');
    } else {
      tag.appendChild(child);
    }
  });

  // Append tags
  Object.keys(htmlAttrs).forEach(function (attr) {
    return tag.setAttribute(attr, htmlAttrs[attr]);
  });

  return tag;
}

function pdfPropsToHTMLAttrs(pdfProps) {
  return Object.keys(pdfProps).reduce(function (acc, prop) {
    if (prop === 'bold') {
      return _extends({}, acc, { style: 'font-weight: bold;' + acc.style });
    }
    return acc;
  }, { style: '' });
}