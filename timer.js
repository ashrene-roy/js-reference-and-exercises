const sleep = (timer) => {
    return new Promise((resolve) => {
        setTimeout(resolve, timer);
    })
}

const timer = async () => {
    for(let i=1; i<5; i++) {
        console.log(`Waiting ${i} seconds...`);
        await sleep(i*1000);
    }
}

timer();
