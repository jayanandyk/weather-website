console.log('client side js running');

const weatherForm = document.getElementById('weather-form');
const locationinput = document.getElementById('location-input');
const messageOne = document.getElementById('para-1');
const messageTwo = document.getElementById('para-2');



weatherForm.addEventListener('submit', (e)=> {
    e.preventDefault();
    const { value } = locationinput;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${value}`).then((res)=>{
        res.json().then((data)=> {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});
