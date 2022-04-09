let dashboardData;

fetch('./data.json')
 .then(res => res.json())
 .then(data => dashboardData = data);


