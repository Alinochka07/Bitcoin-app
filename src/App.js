import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";

export default function App() {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const bitcoinURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1';

    const fetchData = async() => {
        await axios.get(bitcoinURL)
        .then((response) => {
            setData(response.data)
            setIsLoading(true)
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    const menu = [
        {title: 'ID'},
        {title: 'Symbol'},
        {title: 'Name'}
    ]

    return (
        <div className="App">
            <div className='bitcoins'>
                <h1>Bitcoins data fetched using axios</h1>
                {isLoading? 
                    <table className='bitcoins__table'>
                        <tbody>
                            <tr className='bitcoins_table__row'>
                            {menu.map(({title}, index) => {
                                return <th key={index} className='bitcoins_table__head'>{title}</th>
                                })}
                            </tr>
                       
                        {data.map(({id, symbol, name}) => {
                        return <tr key={id} className='bitcoins_table__row'>
                                        <td className='bitcoins_table_data'>{id}</td>
                                        <td className={symbol === 'usdt' ? 'bg_green' : 'bitcoins_table_data'}>{symbol}</td>
                                        <td className='bitcoins_table_data'>{name}</td>
                                    </tr>
                        } )
                        }
                        </tbody>
                    </table>
                    : <p>Please wait, data is loading...</p>
                    }
            </div>
        </div>
    );
}

