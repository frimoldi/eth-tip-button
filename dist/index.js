function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ethers = require('ethers');
var reactTransitionGroup = require('react-transition-group');

// A type of promise-like that resolves synchronously and supports only one observer

const _iteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.iterator || (Symbol.iterator = Symbol("Symbol.iterator"))) : "@@iterator";

const _asyncIteratorSymbol = /*#__PURE__*/ typeof Symbol !== "undefined" ? (Symbol.asyncIterator || (Symbol.asyncIterator = Symbol("Symbol.asyncIterator"))) : "@@asyncIterator";

// Asynchronously call a function and send errors to recovery continuation
function _catch(body, recover) {
	try {
		var result = body();
	} catch(e) {
		return recover(e);
	}
	if (result && result.then) {
		return result.then(void 0, recover);
	}
	return result;
}

var styles = {"container":"_3IMWP","input":"_ozRAq","button":"_3wODo","buttonEnterActive":"_2zvQw","buttonEnterDone":"_3Vs4V","buttonExit":"_1dphn","buttonExitActive":"_52QBs","buttonExitDone":"_1WkqM"};

var Button = function Button(_ref) {
  var recipientAddress = _ref.recipientAddress,
      label = _ref.label,
      collapsedLabel = _ref.collapsedLabel,
      onTransactionSent = _ref.onTransactionSent,
      onTransactionFinished = _ref.onTransactionFinished,
      onError = _ref.onError;

  var _useState = React.useState(true),
      isExpanded = _useState[0],
      setIsExpanded = _useState[1];

  var _useState2 = React.useState(0.001),
      ethValue = _useState2[0],
      setEthValue = _useState2[1];

  var handleClick = function handleClick() {
    try {
      if (isExpanded) {
        setIsExpanded(false);
        return Promise.resolve();
      }

      var _temp4 = _catch(function () {
        setIsExpanded(true);
        var provider = new ethers.ethers.providers.Web3Provider(window.ethereum);
        return Promise.resolve(provider.listAccounts()).then(function (accounts) {
          function _temp2() {
            var signer = provider.getSigner();
            return Promise.resolve(signer.sendTransaction({
              to: recipientAddress,
              value: ethers.ethers.utils.parseEther("" + ethValue)
            })).then(function (tx) {
              onTransactionSent && onTransactionSent(tx);
              return Promise.resolve(tx.wait()).then(function (receipt) {
                onTransactionFinished && onTransactionFinished(receipt);
              });
            });
          }

          var _temp = function () {
            if (accounts.length === 0) {
              return Promise.resolve(provider.send('eth_requestAccounts', [])).then(function () {});
            }
          }();

          return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
        });
      }, function (error) {
        onError && onError(error);
      });

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(function () {}) : void 0);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  var handleChange = function handleChange(e) {
    e.preventDefault();
    setEthValue(e.target.valueAsNumber);
  };

  return React__default.createElement("div", {
    className: styles.container
  }, React__default.createElement("input", {
    className: styles.input,
    type: 'number',
    step: 0.001,
    value: ethValue,
    onChange: handleChange
  }), React__default.createElement(reactTransitionGroup.CSSTransition, {
    "in": !isExpanded,
    timeout: 200,
    classNames: {
      enterActive: styles.buttonEnterActive,
      enterDone: styles.buttonEnterDone,
      exitActive: styles.buttonExitActive,
      exitDone: styles.buttonExitDone,
      exit: styles.buttonExit
    }
  }, React__default.createElement("button", {
    className: styles.button,
    onClick: handleClick
  }, isExpanded ? label : collapsedLabel)));
};

exports.Button = Button;
//# sourceMappingURL=index.js.map
