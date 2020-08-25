import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useAccount } from 'context/account'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        cursor: 'pointer',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});
const abi = 
[
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "x",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "balance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "get",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBill",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "history",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]
export default function SimpleCard() {
    const classes = useStyles()
    const { address } = useAccount()
    const createContract = () =>{
        const contractInstance = window.web3.eth.contract(abi).at('0x9f4ce9d3dB1420a95647c0cC3408447836D2Db4F');

        contractInstance.get({ from: address },(err, res) => {
            if(err) console.error(err);
            console.log(res.toNumber());
        });
    }
    const createContract2 = () =>{
        const contractInstance = window.web3.eth.contract(abi).at('0x9f4ce9d3dB1420a95647c0cC3408447836D2Db4F');

        contractInstance.set(window.web3.toHex("200"), { from: address }, (err, res) => {
            if (err) console.error(err);
            console.log(res);
        });
    }
    return (<>
        <Card className={classes.root} onClick={createContract} >
            <CardContent>
                <Typography align="center" variant="h5" component="h2">
                    CALL get
                </Typography>
            </CardContent>
        </Card>
        <Card className={classes.root} onClick={createContract2} >
            <CardContent>
                <Typography align="center" variant="h5" component="h2">
                    CALL set
                </Typography>
            </CardContent>
        </Card>
    </>);
}
