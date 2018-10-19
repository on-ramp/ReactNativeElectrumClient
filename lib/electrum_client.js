const Client = require("./client")
class ElectrumClient extends Client{
    constructor(port, host, protocol, options){
        super(port, host, protocol, options)
    }
    onClose(){
        super.onClose()
        const list = [
            'server.peers.subscribe',
            'blockchain.numblocks.subscribe',
            'blockchain.headers.subscribe',
            'blockchain.address.subscribe'
        ]
        list.forEach(event => this.subscribe.removeAllListeners(event))
    }
    server_version(client_name, protocol_version){
        return this.request('server.version', [client_name, protocol_version])
    }
    serverPeers_subscribe(){
        return this.request('server.peers.subscribe', [])
    }
    blockchainAddress_balance(address){
        return this.request('blockchain.address.balance', [address])
    }
    blockchainAddress_history(address, page = 0, offset = 20){
        return this.request('blockchain.address.history', [address, page, offset])
    }
    blockchainAddress_mempool(address){
        return this.request('blockchain.address.mempool', [address])
    }
    blockchainAddress_listunspent(address){
        return this.request('blockchain.address.listunspent', [address])
    }
    blockchainAddress_utxo(address, amount = 1){
        return this.request('blockchain.address.utxo', [address, amount])
    }
    blockchainAddress_subscribe(address){
        return this.request('blockchain.address.subscribe', [address])
    }
    blockchainBlock_header(index){
        return this.request('blockchain.block.header', [index])
    }
    blockchainEstimateSmartfee(){
        return this.request('blockchain.estimatesmartfee', [])
    }
    blockchainHeaders_subscribe(){
        return this.request('blockchain.headers.subscribe', [])
    }
    blockchainNumblocks_subscribe(){
        return this.request('blockchain.numblocks.subscribe', [])
    }
    blockchainTransaction_send(rawtx){
        return this.request('blockchain.transaction.send', [rawtx])
    }
    blockchainTransaction_get(tx_hash){
        return this.request('blockchain.transaction.get', [tx_hash])
    }
    blockchainTransaction_verbose(tx_hash){
        return this.request('blockchain.transaction.verbose', [tx_hash])
    }
}

module.exports = ElectrumClient
