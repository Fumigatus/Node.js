const EventEmitter = require('events');

const celebrity = new EventEmitter();


//observer1
celebrity.on('race',(result)=>{
    if(result=='win'){
        console.log('Congratulations!')
    }
})

//observer2
celebrity.on('race',(result)=>{
    if(result=='win'){
        console.log('Boo!')
    }
})

process.on('exit',(code)=>{
    console.log('Process exit event with code:',code)
})

celebrity.emit('race','win')
