let dashboardData;

fetch('./data.json')
 .then(res => res.json())
 .then(data => dashboardData = data);

const buttons = document.querySelectorAll('.time-frame-button');
const dashboardContainer = document.getElementById('dashboard-container');

const activateButton = (button) => {
 buttons.forEach( button => button.classList.remove('active'));
 button.classList.add('active')
}

const removeActivityContainers = () => {
  const previousContainers = document.querySelectorAll('.activity-container')
  previousContainers.forEach( item => item.remove())
}

const changeTimeFrame = (option) => {
  removeActivityContainers();
 const getPreviousTimeFrameText = ( timeframe) => {
  switch (timeframe) {
   case 'daily':
    return 'Yesterday - ';
   case 'weekly':
    return 'Last week - ';
   case 'monthly':
    return 'Last month - ';
  }
 }

 dashboardData.forEach ( activity => {
  const activityName = activity.title;
  const activityTimeFrame = activity.timeframes[option];
  const previousTimeFrameText = getPreviousTimeFrameText(option)
  const activityClass = activityName.toLowerCase().replace(' ', '-')
  const activityContainer = document.createElement('div');
  activityContainer.classList.add('item', 'activity-container', activityClass );
  activityContainer.innerHTML = `
    <div class="header">
      <img src="./images/icon-${activityClass}.svg"/></div>
      <div class="section-content"> 
        <span>${activityName}</span>
        <span class="ellipsis-icon"><img src="./images/icon-ellipsis.svg" alt="ellipsis-icon"/></span>
        <div>
          <p class='time-current'> ${activityTimeFrame.current}hrs</p>
          <p class='time-previous'> ${previousTimeFrameText}${activityTimeFrame.previous}hrs</p>
      </div>
    </div>
  `;
  dashboardContainer.appendChild(activityContainer)
 })
}

buttons.forEach( button => {
 button.addEventListener('click', () => {
  activateButton(button);
  const activeButton = button.dataset.option
  changeTimeFrame(activeButton);
 })
})

setTimeout(() => buttons[0].click(), 50)

