import { useEffect, useState } from 'react';
import './App.css';
import PunCreate from './components/PunCreate';
import PunList from './components/PunList';
import "./index.css";
// import axios from "axios";

function App() {
  const [puns, setPuns] = useState([]);

  const fetchPuns = async () => {
    try {
      const response = await fetch('/api/puns');
      const data = await response.json();
      setPuns(data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchPuns();
  }, [])

  const createPun = async (pun) => {
    try {
      await fetch('/api/puns', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pun }),
      });
      // const data = await response.json();
      // setPuns([...puns, data]);
    } catch (err) {
      console.error(err);
    }

    fetchPuns();

    // await axios.post("http://localhost:3001/puns", {title});
    
    // // console.log(newPun);

    // await fetchPuns();
  }

  const editPun = async ({ id, pun }) => {
    try {
      await fetch(`/api/puns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pun }),
      });
    } catch (err) {
      console.error(err);
    }

    // await axios.put(`http://localhost:3001/puns/${id}`, {title});

    await fetchPuns();


    // const newPuns = puns.map((pun) => {
    //   if(pun.id === id){
    //     return {...pun, title}
    //   }
    //   return pun;
    // })

    // setPuns(newPuns);
    // do something to edit puns array with new pun
  }

  const deletePun = async (punId) => {
    console.log(`deleting ${punId}`);

    try {
      await fetch(`/api/puns/${punId}`, {
      method: 'DELETE',
    });
    } catch (err) {
      console.error(err);
    }

    // await axios.delete(`http://localhost:3001/puns/${punId}`);

    // console.log(deletedPun.data);

    await fetchPuns();

    // const newPuns = puns.filter((element) => element.id!==punId);

    // console.log(newPuns)

    //TODO: incomplete funciton, determine logic for deletePun
    // setPuns(newPuns);
  }

  return (
    <div className='app'>
      <PunCreate onCreate={createPun} />
      <PunList puns={puns} handleEdit={editPun} handleDelete={deletePun} />
    </div>
  )
}

export default App
