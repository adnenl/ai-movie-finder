'use client';

import { MovieList } from "@/components/movie-list";
import { useMovieContext } from "@/context/MovieContext";
import { useEffect, useState } from "react";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WatchListPage() {
    const { watchList, isClientReady } = useMovieContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isClientReady) {
            setIsLoading(false);
        }
    }, [isClientReady]);

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-6xl px-4">
                <div className="flex items-center mt-8 mb-6">
                    <Link href="/" className="mr-4">
                        <Button variant="outline" size="icon">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold">Your Watchlist</h1>
                </div>

                {/* Only show content when client is ready */}
                {isLoading ? (
                    <div className="flex justify-center w-full p-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>
                ) : watchList.length === 0 ? (
                    <div className="text-center py-16">
                        <h2 className="text-xl mb-4">Your watchlist is empty</h2>
                        <p className="text-gray-500 mb-6">
                            Add movies to your watchlist by clicking the eye icon on movie cards.
                        </p>
                        <Link href="/">
                            <Button>Browse Movies</Button>
                        </Link>
                    </div>
                ) : (
                    <MovieList movies={watchList} />
                )}
            </div>
        </div>
    );
}