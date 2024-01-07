import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// NOTE: Change this date to whatever date you want to countdown to :)
const COUNTDOWN_FROM = "2024-01-17T13:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const ShiftingCountdown = () => {
    const intervalRef = useRef(null);

    const [remaining, setRemaining] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        intervalRef.current = setInterval(handleCountdown, 1000);

        return () => clearInterval(intervalRef.current || undefined);
    }, []);

    const handleCountdown = () => {
        const end = new Date(COUNTDOWN_FROM);

        const now = new Date();

        const distance = +end - +now;

        const days = Math.floor(distance / DAY);
        const hours = Math.floor((distance % DAY) / HOUR);
        const minutes = Math.floor((distance % HOUR) / MINUTE);
        const seconds = Math.floor((distance % MINUTE) / SECOND);

        setRemaining({
            days,
            hours,
            minutes,
            seconds,
        });
    };

    return (
        <div>
        <div className="text-center mt-2 mb-3 lg:mt-6 sm:text-xl md:text-2xl lg:text-3xl">Event will start in</div>
            <div className="flex gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                <CountdownItem num={ remaining.days } text="days" />
                <CountdownItem num={ remaining.hours } text="hours" />
                <CountdownItem num={ remaining.minutes } text="minutes" />
                <CountdownItem num={ remaining.seconds } text="seconds" />
            </div>
            
        </div>
    );
};

const CountdownItem = ({ num, text }) => {
    return (
        <div className="flex gap-2 sm:gap-3 md:gap-4 lg:gap-6 justify-center items-center">
            <div className="w-full text-center relative overflow-hidden">
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={ num }
                        initial={ { y: "100%" } }
                        animate={ { y: "0%" } }
                        exit={ { y: "-100%" } }
                        transition={ { ease: "backIn", duration: 0.75 } }
                        className="block text-base md:text-xl lg:text-2xl text-white font-medium"
                    >
                        { num }
                    </motion.span>
                </AnimatePresence>
            </div>
            <span className="text-sm md:text-base lg:text-lg text-white font-light">
                { text }
            </span>
        </div>
    );
};

export default ShiftingCountdown;