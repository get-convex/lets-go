"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SummaryContext = void 0;

var React = _interopRequireWildcard(require("react"));

var _Cell = _interopRequireDefault(require("./Cell"));

var _Row = _interopRequireDefault(require("./Row"));

var SummaryContext = /*#__PURE__*/React.createContext({});
/**
 * Syntactic sugar. Do not support HOC.
 */

exports.SummaryContext = SummaryContext;

function Summary(_ref) {
  var children = _ref.children;
  return children;
}

Summary.Row = _Row.default;
Summary.Cell = _Cell.default;
var _default = Summary;
exports.default = _default;