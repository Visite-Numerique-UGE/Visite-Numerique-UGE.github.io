export const getUserLocation = (callback) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    callback(userLocation);
                },
                (error) => {
                    console.error('Erreur de géolocalisation:', error);
                }
            );
        } else {
            console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
        }
};