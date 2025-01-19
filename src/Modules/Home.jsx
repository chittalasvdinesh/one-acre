import React, { useState, useEffect, useRef } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardSkeleton from "../Components/CardSkeleton";
import { priceFormatter } from "../utils/PriceFormatter";
import Card from "../Components/Card";


const HomeModule = () => {
    const [cards, setCards] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(null)
    const observerRef = useRef(null);

    const fetchCards = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://prod-be.1acre.in/lands/?division=24&page_size=10&page=${page}&ordering=-updated_at`);
            const data = await response.json();

            const processedData = data.results.map((item) => {
                const state = item.division_info.find((div) => div.division_type === "state")?.name || "Unknown State";
                const district = item.division_info.find((div) => div.division_type === "district")?.name || "Unknown District";
                const mandal = item.division_info.find((div) => div.division_type === "mandal")?.name || "Unknown Mandal";

                const images = item.land_media.map((val) => val.image);
                const landPrice = priceFormatter(Number(item.total_price))
                console.log(item.land_media.map((val) => val.image), item.total_price)
                const landSize = {
                    acres: item.land_size.total_land_size_in_acres.acres,
                    cents: item.land_size.total_land_size_in_acres.cents,
                    guntas: item.land_size.total_land_size_in_acres.guntas
                }

                return { state, district, mandal, images, landPrice, landSize };
            });


            setCards(page > 1 ? (prevCards) => [...prevCards, ...processedData] : processedData);

            if (!data.next) setHasMore(false);
        } catch (error) {
            console.error("Error fetching cards:", error);
            setError(error)
        }
        setLoading(false);
    };

    useEffect(() => {
        const observerCallback = (entries) => {
            if (entries[0].isIntersecting && !loading && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        };

        const observer = new IntersectionObserver(observerCallback, { threshold: 1.0 });

        if (observerRef.current) observer.observe(observerRef.current);

        return () => {
            if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [loading, hasMore]);

    useEffect(() => {
        if (hasMore) {
            fetchCards();
        }
    }, [page]);



    if (error) return <div>Error While Fetching Data</div>

    return (
        <div>
            <h1 className="pt-4 pb-4">One Acre</h1>
            {loading && page == 1 ? <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 10 }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </div>
                :
                <div className="md:grid-cols-2 lg:grid-cols-3 grid gap-3">
                    {cards.map((card, index) => (
                        <Card card={card} key={index} />
                    ))}
                </div>}
            <div
                ref={observerRef}
                className="h-[20px] bg-transparent"
            />
            {(loading && page > 1) && <p className="text-center">Loading...</p>}
            {!hasMore && <p className="text-center">No more data to load.</p>}
        </div >
    );
};

export default HomeModule;
