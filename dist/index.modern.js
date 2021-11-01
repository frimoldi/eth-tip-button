import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CSSTransition } from 'react-transition-group';

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

// Asynchronously await a promise and pass the result to a finally continuation
function _finallyRethrows(body, finalizer) {
	try {
		var result = body();
	} catch (e) {
		return finalizer(true, e);
	}
	if (result && result.then) {
		return result.then(finalizer.bind(null, false), finalizer.bind(null, true));
	}
	return finalizer(false, result);
}

var styles = {"container":"_3IMWP","input":"_ozRAq","button":"_3wODo","buttonEnterActive":"_2zvQw","buttonEnterDone":"_3Vs4V","buttonExit":"_1dphn","buttonExitActive":"_52QBs","buttonExitDone":"_1WkqM"};

var Button = function Button(_ref) {
  var recipientAddress = _ref.recipientAddress,
      label = _ref.label,
      _ref$loadingLabel = _ref.loadingLabel,
      loadingLabel = _ref$loadingLabel === void 0 ? 'Loading ...' : _ref$loadingLabel,
      collapsedLabel = _ref.collapsedLabel,
      onTransactionSent = _ref.onTransactionSent,
      onTransactionFinished = _ref.onTransactionFinished,
      onError = _ref.onError;

  var _useState = useState(false),
      isLoading = _useState[0],
      setIsLoading = _useState[1];

  var _useState2 = useState(true),
      isExpanded = _useState2[0],
      setIsExpanded = _useState2[1];

  var _useState3 = useState(0.001),
      ethValue = _useState3[0],
      setEthValue = _useState3[1];

  var handleClick = function handleClick() {
    try {
      if (isExpanded) {
        setIsExpanded(false);
        return Promise.resolve();
      }

      var _temp4 = _finallyRethrows(function () {
        return _catch(function () {
          setIsLoading(true);
          setIsExpanded(true);
          var provider = new ethers.providers.Web3Provider(window.ethereum);
          return Promise.resolve(provider.listAccounts()).then(function (accounts) {
            function _temp2() {
              var signer = provider.getSigner();
              return Promise.resolve(signer.sendTransaction({
                to: recipientAddress,
                value: ethers.utils.parseEther("" + ethValue)
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
      }, function (_wasThrown, _result) {
        setIsLoading(false);
        if (_wasThrown) throw _result;
        return _result;
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

  return React.createElement("div", {
    className: styles.container
  }, React.createElement("input", {
    className: styles.input,
    type: 'number',
    step: 0.001,
    value: ethValue,
    onChange: handleChange,
    disabled: isLoading
  }), React.createElement(CSSTransition, {
    "in": !isExpanded,
    timeout: 200,
    classNames: {
      enterActive: styles.buttonEnterActive,
      enterDone: styles.buttonEnterDone,
      exitActive: styles.buttonExitActive,
      exitDone: styles.buttonExitDone,
      exit: styles.buttonExit
    }
  }, React.createElement("button", {
    className: styles.button,
    onClick: handleClick,
    disabled: isLoading
  }, isLoading ? loadingLabel : isExpanded ? label : collapsedLabel)));
};

export { Button };
//# sourceMappingURL=index.modern.js.map
