import {useParams} from "react-router";
import {useState, useEffect} from "react";
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
                console.log(data);
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
        <div>Coin Details {id}</div>
    );
}

export default CoinDetailsPage;