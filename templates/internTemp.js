module.exports = param1 => {
    return `<div style="min-height:300px; width:250px; border: 1px solid black; box-shadow: 0 0 10px black; margin:20px; overflow: auto;">
                <div style="background-color:lightblue; color:white; padding:10px; text-align:center;">
                    <h1 style="margin:0;">${param1.name}</h1>
                    <h1><i class="fas fa-cogs"></i>  ${param1.getRole()}</h1>
                </div>
                <div style="padding:10px;">
                    <hr>
                    <p><strong>ID:</strong> ${param1.id}</p>
                    <p><strong>Email:</strong> ${param1.email}</p>
                    <p><strong>School:</strong> ${param1.getSchool()}</p>
                </div>
            </div>`
};