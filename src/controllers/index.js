const Web3 = require('web3');

const { abi } = require('../utils/abi.json');

const web3 = new Web3(process.env.PROVIDER); 
const contract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS);


const getProducts = async () => {

  const amountOfProducts = await contract.methods.size().call();
  let products = [];

  for (let productId = 0; productId < amountOfProducts; productId++) {
    const product = await contract.methods.products(productId).call();
    products.push(product);
  }
    
  return products;

}

const createProduct = async (name) => {

  const tx = {
    from: process.env.PUBLIC_KEY,
    to: process.env.CONTRACT_ADDRESS,
    gasLimit: web3.utils.toHex(300000),
    data: contract.methods.createProduct(name).encodeABI()
  };

  const signature = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

  let sTx = await web3.eth.sendSignedTransaction(signature.rawTransaction)
  .on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === 1) {
          console.log(receipt)
      }
  })
  .on('error', (error) => {
      console.log(error)
  })
  .on('transactionHash', async (hash) => {
      console.log(hash);
  })
  .catch(e => {
  console.log(e)
  });

  return sTx;
}

const delegateProduct = async (newOwner, productId) => {
  const tx = {
    from: process.env.PUBLIC_KEY,
    to: process.env.CONTRACT_ADDRESS,
    gasLimit: web3.utils.toHex(300000),
    data: contract.methods.delegateProduct(productId, newOwner).encodeABI()
  }

  const signature = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

  let sTx = await web3.eth.sendSignedTransaction(signature.rawTransaction)
  .on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === 1) {
          console.log(receipt)
      }
  })
  .on('error', (error) => {
      console.log(error)
  })
  .on('transactionHash', async (hash) => {
      console.log(hash);
  })
  .catch(e => {
  console.log(e)
  });

  return sTx;
}

const acceptProductDelegation = async (productId) => {
  const tx = {
    from: process.env.PUBLIC_KEY,
    to: process.env.CONTRACT_ADDRESS,
    gasLimit: web3.utils.toHex(300000),
    data: contract.methods.acceptProduct(productId).encodeABI()
  }

  const signature = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

  let sTx = await web3.eth.sendSignedTransaction(signature.rawTransaction)
  .on('confirmation', (confirmationNumber, receipt) => {
      if (confirmationNumber === 1) {
          console.log(receipt)
      }
  })
  .on('error', (error) => {
      console.log(error)
  })
  .on('transactionHash', async (hash) => {
      console.log(hash);
  })
  .catch(e => {
  console.log(e)
  });

  return sTx;
}

const getDelegatedProductsByAddress = async (address) => {
  const amountOfProducts = await contract.methods.size().call();
  let products = [];

  for (let productId = 0; productId < amountOfProducts; productId++) {
    const product = await contract.methods.products(productId).call();
    if (product.owner == address) products.push(product);
  }
    
  return products;
}

module.exports = {
  getProducts,
  createProduct,
  delegateProduct,
  acceptProductDelegation,
  getDelegatedProductsByAddress
}