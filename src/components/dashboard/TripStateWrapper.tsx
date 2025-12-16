'use client';

import { useState, useEffect } from 'react';
import { NoTripView } from './states/NoTripView';
import { UpcomingView } from './states/UpcomingView';
import { OngoingView } from './states/OngoingView';
import { CompletedView } from './states/CompletedView';
import type { TripState } from '@/lib/trip-logic';

export function TripStateWrapper() {
    const [currentState, setCurrentState] = useState<TripState>('NO_TRIP');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch the current trip state from API
        fetch('/api/dashboard')
            .then(res => res.json())
            .then(data => {
                setCurrentState(data.tripState || 'NO_TRIP');
                setLoading(false);
            })
            .catch(() => {
                setCurrentState('NO_TRIP');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    switch (currentState) {
        case 'NO_TRIP':
            return <NoTripView />;
        case 'UPCOMING':
            return <UpcomingView />;
        case 'ONGOING':
            return <OngoingView />;
        case 'COMPLETED':
            return <CompletedView />;
        default:
            return <NoTripView />;
    }
};
