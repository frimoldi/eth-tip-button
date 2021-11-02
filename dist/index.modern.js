import React, { useState } from 'react';
import { ethers } from 'ethers';
import { CSSTransition } from 'react-transition-group';

var styles = {"container":"_styles-module__container__3IMWP","input":"_styles-module__input__ozRAq","button":"_styles-module__button__3wODo","buttonEnterActive":"_styles-module__buttonEnterActive__2zvQw","buttonEnterDone":"_styles-module__buttonEnterDone__3Vs4V","buttonExit":"_styles-module__buttonExit__1dphn","buttonExitActive":"_styles-module__buttonExitActive__52QBs","buttonExitDone":"_styles-module__buttonExitDone__1WkqM"};

const Button = ({
  recipientAddress,
  label,
  collapsedLabel,
  onTransactionSent,
  onTransactionFinished,
  onError
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [ethValue, setEthValue] = useState(0.001);

  const handleClick = async () => {
    if (isExpanded) {
      setIsExpanded(false);
      return;
    }

    try {
      setIsExpanded(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.listAccounts();

      if (accounts.length === 0) {
        await provider.send('eth_requestAccounts', []);
      }

      const signer = provider.getSigner();
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(`${ethValue}`)
      });
      onTransactionSent && onTransactionSent(tx);
      const receipt = await tx.wait();
      onTransactionFinished && onTransactionFinished(receipt);
    } catch (error) {
      onError && onError(error);
    }
  };

  const handleChange = e => {
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
    onChange: handleChange
  }), React.createElement(CSSTransition, {
    in: !isExpanded,
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
    onClick: handleClick
  }, isExpanded ? label : collapsedLabel)));
};

export { Button };
//# sourceMappingURL=index.modern.js.map
