module.exports = myTeam => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Engineering Team</title>
    <style>
        .title {
            display:inline-block; 
            margin-top:50px; 
            margin-left:50%; 
            transform:translateX(-50%); 
            color:darkorange;
        }
        .import {
            display:flex;
            justify-content: space-evenly;
            flex-wrap: wrap;
            margin-top: 20px;
        }
    </style>
</head>
<body style="margin:0;">
    <header style="height:150px; width:100%; background-color:aquamarine;">
        <h1 class="title">My Team</h1>
    </header>
    <div class="import">
       ${myTeam}
    </div>
</body>
</html>`
};