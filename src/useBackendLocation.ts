import useSWR from "swr";

const DEFAULT_LOCATION = { latitude: 50.9856, longitude: 12.9810 };

function getFallbackLocation() {
    const stored = sessionStorage.getItem("startLocation");
    if (stored) {
        try {
            const [latitude, longitude] = JSON.parse(stored);
            if (typeof latitude === "number" && typeof longitude === "number") {
                return { latitude, longitude };
            }
        } catch {
            // fall through to default below
        }
    }
    return DEFAULT_LOCATION;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBackendLocation() {
    // The location backend only runs locally during development. When it's
    // unreachable (e.g. on the deployed site), fall back to the location
    // already captured in sessionStorage instead of erroring out.
    const { data, error, isLoading, mutate } = useSWR("http://localhost:3001/location", fetcher, {
        shouldRetryOnError: false,
    });

    const location = data ?? (error ? getFallbackLocation() : undefined);

    return {
        location,
        isLoading,
        isError: false,
        mutate,
    };
}
