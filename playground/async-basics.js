console.log('Starting app');

setTimeout(()=>{
    console.log('Inside of call back');
},2000);

setTimeout(()=>{
    console.log('Second timeout works');
},0);

console.log('Finishing up');
