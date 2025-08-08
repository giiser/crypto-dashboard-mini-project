import {useState, useEffect} from 'react';
import CoinCard from "./components/CoinCard.jsx";
import LimitSelector from "./components/LimitSelector.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const App = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [limit, setLimit] = useState(10);

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

    return (
        <>
            <h1>🚀 Crypto Dash</h1>
            {loading && <p>Loading...</p>}
            {error && <div className="error">{error}</div>}

            <LimitSelector limit={limit} onLimitChange={setLimit} />

            {!error && !loading && (
                <main className={"grid"}>
                    {coins.map((coin) => (
                        <CoinCard key={coin.id} coin={coin} />
                    ))}
                </main>
            )}
        </>
    )
}

export default App
