import axios from 'axios';
import { useCallback, useState } from 'react'; 

const usePost = (url) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const postData = useCallback(async (id, body, token, role) => {
        setLoading(true);
        setError(null);

        try {

            const data = await axios.post(`${url}/${id}`, body, {
                headers: {
                    "Content-Type": 'application/json',
                    "authorization": `Bearer ${token}`,
                    "role": `Bearer ${role}`
                }
            })

            return data.data;

        } catch (error) {
            setError(handleErrors(error));
        } finally {
            setLoading(false);
        }
    }, [url]);

    const registerLogin = useCallback(async (body) => {
        setLoading(true);
        setError(null);

        try {

            const data = await axios.post(url, body, {
                headers: {
                    "Content-Type": "application/json",
                }
            });

            return data.data;

        } catch (error) {
            setError(handleErrors(error));
        } finally {
            setLoading(false);
        }
    }, [url]);

    return { postData, registerLogin, error, loading };
}

const handleErrors = (error) => {
    if (error.response) {
        if (error.response.data.message)
            return error.response.data.message;

        if (error.response.data.error) 
            return error.response.data.error.map(err => <p>{`${err.msg}\n`}</p>);
    } else {
        return 'Ha ocurrido un error en el envío de los datos';
    }
}

export default usePost;