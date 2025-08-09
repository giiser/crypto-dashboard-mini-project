import {Link} from "react-router";

const NotFoundPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>404 - Page Not Found</h1>
            <p style={styles.message}>You are in the wrong place, my friend...</p>
            <Link to="/" style={styles.link}>Go Home, maybe you will be lucky next time</Link>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "80px 20px",
        color: "white",
    },
    title: {
        fontSize: "72px",
        marginBottom: "20px"
    },
    message: {
        fontSize: "18px",
        marginBottom: "30px"
    },
    link: {
        textDecoration: "none",
        color: "#007bff",
        fontWeight: "bold"
    }
}

export default NotFoundPage;