import {useState, useEffect} from 'react';
import CoinCard from "./components/CoinCard.jsx";
import LimitSelector from "./components/LimitSelector.jsx";
import FilterInput from "./components/FilterInput.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);
    const [filter, setFilter] = useState("");

    useEffect(() => {

        const fetchCoins = async () => {
            try{
               const response = await fetch(`${API_URL}?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`);
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
    }, [limit])

    const filteredCoins = coins.filter(coin => {
        return coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase());
    })

    return (
        <>
            <h1>🚀 Crypto Dash</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}

            <div className="top-controls">
                <FilterInput filter={filter} onFilterChange={setFilter} />
                <LimitSelector limit={limit} onLimitChange={setLimit} />
            </div>

            {!error && !loading && (
                <main className={"grid"}>
                    {filteredCoins.length>0 ?filteredCoins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    )):<p>No matching coins</p>}
                </main>
            )}
        </>
    )
}

export default App
