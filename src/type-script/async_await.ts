function resolveAfter2Seconds(time:number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, time);
    });
  }
  
  const asyncCall = async () =>  {
    console.log('calling');
    const result = await resolveAfter2Seconds(2000);
    console.log(result);
  }
  const asyncCall2 = async () => {
    console.log('calling');
    const result = await resolveAfter2Seconds(1000);
    console.log(result);
  }
  
asyncCall();
asyncCall2();