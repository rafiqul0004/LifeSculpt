const loadUserdetail = () => {
    const user_id = localStorage.getItem('user_id');
    fetch(`https://smart-care-rp5y.onrender.com/patient/list/${user_id}`)
        .then(res => res.json())
        .then((data) => {
            const parent = document.getElementById('user-details');
            const div = document.createElement('div');
            div.classList.add('user-details');
            div.innerHTML = `
            <div class="user-img">
            <img src="Images/man-1.jpg" alt="">
        </div>
        <div >
            <h3>${data.username}</h3> 
            <h4>${data.first_name}</h4>
            <p>${data.email}</p>
        </div>
            `
            parent.appendChild(div);
    })
}

loadUserdetail();