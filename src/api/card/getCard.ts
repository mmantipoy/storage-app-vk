export const getCardData = async (iter: number) => {
    try {
        const response = await fetch(`https://dummyjson.com/carts?limit=1&skip=${iter}`, {
            method: 'GET'
        });
        
        return await response.json();

    } catch (error) {

        console.error('Ошибка запроса', error);

        return null;
    }
}