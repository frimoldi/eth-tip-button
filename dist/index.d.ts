import { ethers } from 'ethers';
declare type ButtonProps = {
    recipientAddress: string;
    label: string;
    collapsedLabel: string;
    onTransactionSent?: (tx: ethers.providers.TransactionResponse) => void;
    onTransactionFinished?: (tx: ethers.providers.TransactionReceipt) => void;
    onError?: (error: Error) => void;
};
export declare const Button: ({ recipientAddress, label, collapsedLabel, onTransactionSent, onTransactionFinished, onError }: ButtonProps) => JSX.Element;
export {};
