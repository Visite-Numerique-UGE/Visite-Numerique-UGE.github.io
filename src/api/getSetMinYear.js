import { API_KEY, API_URL } from "@/constants";

const getSetMinYear = async (year) => {
    const response = await fetch(`${API_URL}/sets/?key=${API_KEY}&min_year=${year}&page_size=15`);
    const data = await response.json();
    return data;
    };

export { getSetMinYear };