module.exports = param1 => {
    return `<div style="height:250px; width:200px; border: 1px solid black; padding:10px;">
                <h2>${param1.name}</h2>
                <h3>${param1.getRole()}</h3>
                <hr>
                <p>ID: ${param1.id}</p>
                <p>Email: ${param1.email}</p>
                <p>Office number: ${param1.getOfficeNumber()}</p>
            </div>`
};