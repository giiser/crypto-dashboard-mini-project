import {useState, useEffect} from 'react';

import HomePage from "./pages/home";
import AboutPage from "./pages/about";

import {Routes, Route} from "react-router";
import Header from "./components/Header.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("");
    const [sortBy, setSortBy] = useState("market_cap_desc");

    useEffect(() => {

        const fetchCoins = async () => {
            try{
               const response = await fetch(`${API_URL}?vs_currency=usd&order=${sortBy}&per_page=${limit}&page=1&sparkline=false`);
               if (!response.ok) throw new Error('Could not fetch coins');
               const data = await response.json();
               setCoins(data);
            } catch(err){
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCoins();
    }, [limit, sortBy])



    return (
        <>
            <Header />
            <Routes>
                <Route path="/"
                       element={<HomePage
                           coins={coins}
                           filter={filter}
                           setFilter={setFilter}
                           limit={limit}
                           setLimit={setLimit}
                           sortBy={sortBy}
                           setSortBy={setSortBy}
                           loading={loading}
                           error={error}/>}
                />
                <Route path="/about" element={<AboutPage />}/>
            </Routes>
        </>

    )
}

export default App
