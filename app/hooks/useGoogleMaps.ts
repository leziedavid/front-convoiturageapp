// hooks/useGoogleMaps.ts
import { useState, useEffect } from 'react';

const useGoogleMaps = (apiKey: string) => {
    const [googleMaps, setGoogleMaps] = useState<typeof google | null>(null);

    useEffect(() => {
        const loadGoogleMapsScript = () => {
            if (window.google) {
                setGoogleMaps(window.google);
                return;
            }

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
            script.async = true;
            script.defer = true;
            script.onload = () => setGoogleMaps(window.google);
            document.body.appendChild(script);
        };

        loadGoogleMapsScript();
    }, [apiKey]);

    return googleMaps;
};

export default useGoogleMaps;
