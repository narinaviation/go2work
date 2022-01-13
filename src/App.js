import { useState, useEffect } from 'react';
import './App.css'
import './Trains'
import Trains from './Trains';

function Main(props) {
  if (props.train != null && props.train != undefined) {
    return (
      <div className='App-main'>
        <h3>Next train to go {props.destination.toUpperCase()}</h3>
        <h2>{props.train.number} ({props.train.type})</h2>
        <h3>Departs by</h3>
        <h1><span className='App-hilight'>{props.train.departs}</span></h1>
        <h3>Arrives by {props.train.arrives}</h3>
      </div> 
    );
  } else {
    return (
      <div className='App-main'>
        <h1>No trains<br/>availiable</h1>
        <h4>Consider using the<br/>Airport Rail Link (ARL)</h4>
      </div>
    );
  }
};

function UpcomingItems(props) {
  return (
    <>
      <tr>
        <td>No.{props.train.number}</td>
        <td rowSpan='2'><b>{ props.train.departs }</b> to { props.train.arrives}</td>
      </tr>
      <tr>
        <td> {props.train.type} </td>
      </tr>
    </>
  );
}

function Upcoming(props) {
  if (props.trains.length > 0) {
    return (
      <div className='App-upcoming'>
      <h2>Upcoming trains...</h2>
      <table>
        <tbody>
          {props.trains.map((train) => <UpcomingItems key={train.number} train={train} />)}
        </tbody>
      </table>
      </div>
    );
  } else {
    return (
      <div className='App-upcoming'>
        <p>No upcoming trains...</p>
      </div>
    );
  }
}

function App() {
  let [destination, setDestination] = useState('work');
  let [nextTrain, setNextTrain] = useState(Trains.toWork[0]);
  let [upcomingTrains, setUpcomingTrains] = useState(Trains.toWork);

  function getNextTrains(destination) {
    let currentTime = new Date();

    let trainsArray = (destination === 'home') ? Trains.toHome : Trains.toWork;
    let scheduledTrains = [];

    trainsArray.forEach(train => {
      let departureTime = new Date();
      let [hours, minutes] = train.departs.split(':');
      departureTime.setHours(hours);
      departureTime.setMinutes(minutes);
      departureTime.setSeconds(0);

      if(currentTime < departureTime) {
        scheduledTrains = [...scheduledTrains, train];
      }
    });
    setDestination(destination);
    setNextTrain(scheduledTrains[0])
    setUpcomingTrains(scheduledTrains.slice(1));
  }
  
  useEffect(() => {
    getNextTrains('work');
  }, []);
 
  return (
    <div className='App'>
      <div className='App-header'>
        <h1>Narin K's Go2Work</h1>
      </div>
      <div className='App-selector'>
        <button className='App-button' onClick={() => {getNextTrains('work')}}>Go work</button>
        <button className='App-button' onClick={() => {getNextTrains('home')}}>Go home</button>
      </div>
      <Main train={nextTrain} destination={destination}/>
      <Upcoming trains={upcomingTrains}/>
      <br/>
      <footer>
        Developed by Narin K Bannasan<br/>
        /thoughtworks
      </footer>
    </div>
  );
}

export default App;
