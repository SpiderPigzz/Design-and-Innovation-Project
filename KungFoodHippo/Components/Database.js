
const url = 'http://128.199.145.111:5000/'


export const getFromApiAsync = async (path) => {
    
    try {
        console.info(url+path)
        const response = await fetch(
            url+path
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.error(error);
    }
    };
