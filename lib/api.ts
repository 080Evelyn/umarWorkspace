
const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://co-workspace-4bcq.onrender.com/api";

let accessToken: string | null = null;
let refreshPromise: Promise<string | null> | null = null;

export function setAccessToken(token: string) {
    accessToken = token;
}

export function getAccessToken() {
    return accessToken;
}

export function clearAccessToken() {
    accessToken = null;
}

interface ApiError {
    message?: string;
    error?: string;
    fieldErrors?: Record<string, string>;
}

async function parseResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorData: ApiError = {};

        try {
            errorData = await response.json();
        } catch {
            // Response did not contain JSON.
        }

        throw new Error(
            errorData.message ||
            errorData.error ||
            `Request failed with status ${response.status}`
        );
    }

    if (response.status === 204) {
        return undefined as T;
    }

    return response.json() as Promise<T>;
}

async function refreshAccessToken(): Promise<string | null> {
    if (refreshPromise) {
        return refreshPromise;
    }

    refreshPromise = (async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: "POST",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                },
            });

            if (!response.ok) {
                clearAccessToken();
                return null;
            }

            const data = await response.json();

            if (!data.accessToken) {
                clearAccessToken();
                return null;
            }

            setAccessToken(data.accessToken);

            return data.accessToken;
        } catch {
            clearAccessToken();
            return null;
        } finally {
            refreshPromise = null;
        }
    })();

    return refreshPromise;
}

interface ApiRequestOptions extends RequestInit {
    skipAuth?: boolean;
    retry?: boolean;
}

export async function apiRequest<T>(
    endpoint: string,
    options: ApiRequestOptions = {}
): Promise<T> {
    const { skipAuth = false, retry = true, ...fetchOptions } = options;

    const makeRequest = (token: string | null) => {
        const headers = new Headers(fetchOptions.headers);

        headers.set("Accept", "application/json");

        if (
            fetchOptions.body &&
            !(fetchOptions.body instanceof FormData) &&
            !headers.has("Content-Type")
        ) {
            headers.set("Content-Type", "application/json");
        }

        if (token && !skipAuth) {
            headers.set("Authorization", `Bearer ${token}`);
        }

        return fetch(`${API_BASE_URL}${endpoint}`, {
            ...fetchOptions,
            headers,
            credentials: "include",
        });
    };

    let response = await makeRequest(accessToken);

    // Automatically refresh expired access tokens.
    if (response.status === 401 && !skipAuth && retry) {
        const newToken = await refreshAccessToken();

        if (newToken) {
            response = await makeRequest(newToken);
        } else {
            clearAccessToken();
        }
    }

    return parseResponse<T>(response);
}

// Authentication response types
export interface UserProfile {
    id: number | string;
    username: string;
    fullname?: string;
    email?: string;
    role?: string;
}

export interface LoginResponse {
    accessToken: string;
    user: UserProfile;
}

// Get currently authenticated user
export async function getCurrentUser() {
    return apiRequest<UserProfile>("/auth/me");
}

// Logout
export async function logout() {
    try {
        await apiRequest<void>("/auth/logout", {
            method: "POST",
        });
    } finally {
        clearAccessToken();
    }
}
