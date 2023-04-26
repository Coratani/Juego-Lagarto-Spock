import React, { useState, useEffect} from "react";

import  { getBarColor } from './Actions.js'
import '../Tamagotchi/index.css'
import {useNavigate} from "react-router-dom";

function Tamagotchi (){
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [name, setName] = useState('Tamagotchi');
    const [petName, setPetName] = useState('Anonymous');
    const [age, setAge] = useState(0);
    const [health, setHealth] = useState(100);
    const [happiness, setHappiness] = useState(100);
    const [hunger, setHunger] = useState(100);
    let [time, setTime] = useState("");
    let current = new Date().toISOString();
    useEffect(()=>{
        setTime(current)
    }, [current])
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "petName": petName,
            "age": age,
            "hunger": hunger,
            "health": health,
            "happiness": happiness,
            "birthDate":time

        })
    };


    const apicall= ()=> {
      fetch('/api/tamagotchi', requestOptions)
         .then(async response => {
             const isJson = response.headers.get('content-type')?.includes('application/json');
             const data = isJson && await response.json();

             // check for error response
             if (!response.ok) {
                 // get error message from body or default to response status
                 const error = (data && data.message) || response.status;
                return Promise.reject(error);
             }
             else if(response.ok){
                 window.alert("Game finished")
                 navigate("/");

             }

         })
         .catch(error => {

             console.error('There was an error!', error);
         });
 }

    useEffect(() =>{
        const interval = setInterval(() => {
            setAge(age => age + 1);
            setHunger(hunger => Math.max(0, hunger - 5));
            setHealth(health => Math.max(0, health - 5));
            setHappiness(happiness => Math.max(0, happiness - 5));
        }, 3000)
        return () => clearInterval(interval);
    }, []);

    const feed = () => {
        setHunger(hunger => Math.min(100, hunger + 20));
        setHealth(health => Math.min(100, health + 5));
        setHappiness(happiness => Math.min(100, happiness + 5));
    };
    const sleep = () => {
        setHunger(hunger => Math.max(0, hunger - 5));
        setHappiness(happiness => Math.max(0,happiness - 5));
        setHealth(health => Math.min(100, health + 10));
    }
    const play = () => {
        setHunger(hunger => Math.min(100, hunger + 20));
        setHealth(health => Math.max(0, health - 5));
        setHappiness(happiness => Math.min(100, happiness + 5));
    };


    return(

        <div className="container">
            <h1 className="mt-3">{name}</h1>
            <p><strong>Age: {age}</strong></p>
            <p>Hunger:<i className="fa-solid fa-cookie-bite fa-spin-pulse"></i><div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax="100"  style={{width: `${hunger}%`, backgroundColor: getBarColor(hunger),color:"black"}}>
                {hunger}
            </div></p>
            <p>Health: <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemax="100" style={{width: `${health}%`, backgroundColor: getBarColor(health),color:"black"}}>
                {health}
            </div></p>
            <p>Happiness: <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style={{width: `${happiness}%`, backgroundColor: getBarColor(happiness),color:"black"}}>
                {happiness}
            </div></p>
            {health === 0 || happiness === 0 ? (
                <p>Your Tamagotchi has died.</p>
            ) : (
                <>
                    <button onClick={feed}>Feed</button>
                    <button onClick={play}>Play</button>
                    <button onClick={sleep}>Sleep</button>
                    <button onClick={apicall}>Quit</button>
                </>
            )}
        </div>
    );
}
export default Tamagotchi;
