const handleappointment = () => {
    const patient_id = localStorage.getItem('patient_id');
    fetch(`https://smart-care-rp5y.onrender.com/appointment/?patient_id=${patient_id}`)
        .then((res) => res.json())
        .then((data) => {
            data.forEach((item) => {
                const parent = document.getElementById("table-body");
                const tr = document.createElement("tr");
                tr.innerHTML = `
            <td>${item.id}</td>
            <td>${item.symptom}</td>
            <td>${item.appointment_type}</td>
            <td>${item.appointment_status}</td>
            <td>${item.doctor}</td>
            <td>1200tk</td>
            ${
                    item.appointment_status == "Pending" ? `<td class="text-danger">X</td>` : `<td>X</td>`
            }
            `;
                parent.appendChild(tr);
            });
        });
};

handleappointment();