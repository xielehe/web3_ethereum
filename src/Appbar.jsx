import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { head, identity, isEmpty, defaultTo, take, reverse } from 'ramda'
import { Maybe } from "@mostly-adequate/support";
import Chip from '@material-ui/core/Chip';

import { useAccount } from 'context/account'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    boxShadow: 'none',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const web3 = window.web3

const nimiaddr = addr => take(6, addr) + '...' + reverse(take(4, reverse(addr)))
const networks = ['', 'Mainnet', 'Ropsten测试网络', 'Kovan测试网络', 'Rinkeby测试网络', 'Goerli测试网络']

export default function ButtonAppBar({ setBalance, balance }) {
  const classes = useStyles();
    const {address, setaddress} = useAccount()
    useEffect(() => {
        window.ethereum.on('accountsChanged', function (accounts) {
          if (isEmpty(accounts)) setaddress(null)
          else setaddress(head(accounts))
        })
    }, [setaddress]);

    useEffect(() => {
        Maybe.of(address).map(addr=> web3.eth.getBalance(addr, (err, a)=>{
          if(err) console.error(err)
          else if(a && web3) 
            setBalance(parseFloat(web3.fromWei(a, 'Ether').toString()).toFixed(3))
        })
        )
    }, [address, setBalance]);

  const connectToMetaMask =() =>{
    window.ethereum.request({ method: 'eth_requestAccounts' })
      .then(head)
      .catch(identity)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.main}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
          </Typography>
            {address ?<>
            < Chip 
              color="primary"
              variant="outlined"
              label={`${defaultTo('', networks[
                Maybe.of(window).map(win => win.ethereum).map(eth => eth.networkVersion)
                  .$value
              ])}`} style={{fontSize: '1.1em'}} />
            < Chip 
              color="primary"
              variant="outlined"
              label={`${defaultTo('', balance)} ETH`} style={{ fontSize: '1.2em', marginLeft: 5}} />
            < Chip 
              color="primary"
              variant="outlined"
              label={`${defaultTo('', nimiaddr(address))}`} style={{fontSize: '1.1em', marginLeft: 5}} />
            </>: 
              <Button color="inherit" onClick={connectToMetaMask}>连接metamask</Button>
            }
        </Toolbar>
      </AppBar>
    </div>
  );
}
