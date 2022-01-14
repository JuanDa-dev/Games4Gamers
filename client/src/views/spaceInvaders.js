import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SpaceInvaders = () => {
    let { id } = useParams();
    const isAdmin = window.location.hash === "#init";

    useEffect(() => {
    }, []);

    return (
        <div>SpaceInvaders</div>
    );
}

export default SpaceInvaders;