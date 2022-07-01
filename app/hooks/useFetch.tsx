import { useEffect, useState } from "react";

const useFetch = (url: string, dependencyArray: any[] = []) => {
    const [data, setData] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        fetch(url, { method: 'get' })
            .then(res => {
                if (!res.ok) {
                    throw Error("Unknown error!");
                }

                return res.json();
            })
            .then(res => {
                setData(res);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, dependencyArray);

    return { data, loading, error };
}

export default useFetch;