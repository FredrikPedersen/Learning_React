export const DATABASE_URL = process.env.REACT_APP_DATABASE_URL;
export const INGREDIENTS_URL = DATABASE_URL + "ingredients.json";
export const DELETE_INGREDIENTS_URL = (id) => {
    return DATABASE_URL + `ingredients/${id}.json`
};