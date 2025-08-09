import {useParams, Link} from "react-router";
import {useState, useEffect} from "react";
import Spinner from "../components/Spinner.jsx";

const API_URL = import.meta.env.VITE_COIN_DETAILS_API_URL;

const CoinDetailsPage = () => {
    const {id} = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // get data
    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`${API_URL}/${id}`);
                const data = await response.json();
                setCoin(data);

            } catch (err){
                console.error("Coin details fetch failed");
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchCoinDetails();
    }, [id]);
    return (
        <div className={"coin-details-container"}>
            <Link to="/">← Back to Home</Link>

            <h1 className="coin-details-title">
                {coin ? `${coin.name} (${coin.symbol.toUpperCase()})`:"Coin details"}
            </h1>

            {loading && <Spinner />}
            {error && <div className="error">❌ {error}</div>}

            {!loading && !error && (
                <>
                    <img src={coin.image.large} alt={coin.name} className={"coin-details-image"} />

                    <p>{coin.description.en.split('. ')[0]+'.'}</p>
                    <div className="coin-details-info">
                        <h3>Rank: {coin.market_cap_rank}</h3>
                        <h3>Current Price: {coin.market_data.current_price.eur.toLocaleString('et-EE')} €</h3>

                        <h4>Market Cap: {coin.market_data.market_cap.eur.toLocaleString('et-EE')} €</h4>
                        <h4>24h High: {coin.market_data.high_24h.eur.toLocaleString('et-EE')} €</h4>
                        <h4>24h Low: {coin.market_data.low_24h.eur.toLocaleString('et-EE')} €</h4>
                        <h4>
                            24h Price Change: {coin.market_data.price_change_24h_in_currency.eur.toFixed(2)} € ({coin.market_data.price_change_percentage_24h_in_currency.eur.toFixed(2)} %)
                        </h4>
                        <h4>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString('et-EE')}</h4>
                        <h4>Total Supply: {coin.market_data.total_supply?.toLocaleString('et-EE') || 'N/A'}</h4>

                        <h4>All-Time High: {coin.market_data.ath.eur.toLocaleString()} € on {new Date(coin.market_data.ath_date.eur).toLocaleDateString('et-EE')}</h4>
                        <h4>All-Time Low: {coin.market_data.atl.eur.toLocaleString()} € on {new Date(coin.market_data.atl_date.eur).toLocaleDateString('et-EE')}</h4>
                        <h4>Last updated: {new Date(coin.last_updated).toLocaleDateString('et-EE')}</h4>
                    </div>
                    <div className="coin-details-links">
                        {coin.links.homepage[0] && (
                            <p>
                                🌐 <a href={coin.links.homepage[0]} target={"_blank"} rel="noopener noreferrer">Website</a>
                            </p>
                        )}
                        {coin.links.blockchain_site[0] && (
                            <p>
                                🧩 <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">Blockchain Explorer</a>
                            </p>
                        )}
                        {coin.categories.length > 0 && (
                            <p>
                                <strong>Categories</strong>: {coin.categories.join(', ')}
                            </p>
                        )}
                    </div>
                </>
            )}
            {!loading && error && !coin && (
                <p>No Data found</p>
            )}
        </div>
    );
}

export default CoinDetailsPage;