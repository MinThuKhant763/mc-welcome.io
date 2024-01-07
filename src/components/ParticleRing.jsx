import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import { pointsInner, pointsOuter } from "./utils";
import ShiftingCountdown from "./ShiftingCountdown";
import Heading from "./Heading";
import Paragraph from "./Paragraph";
import Detail from "./Detail";
const ParticleRing = () => {
    return (
        <div className="relative">
            <Canvas
                camera={ {
                    position: [10, -7.5, -5],
                } }
                style={ { height: "100vh" } }
                className="bg-slate-900"
            >
                <OrbitControls maxDistance={ 20 } minDistance={ 10 } />
                <directionalLight />
                <pointLight position={ [-30, 0, -30] } power={ 10.0 } />
                <PointCircle />

            </Canvas>
            <div className=" absolute top-[5%] left-[50%] -translate-x-[50%] -translate-y-[50%] pointer-events-none text-center">
                <ShiftingCountdown />
               
            </div>
            <div className="absolute top-[27%] left-[50%] -translate-x-[50%] -translate-y-[50%] pointer-events-none text-center">
                <Heading />
            </div>
            <div className="absolute top-[45%] left-[50%] -translate-x-[50%] -translate-y-[50%] pointer-events-none text-center">
                <Paragraph />
                <div className="text-xl text-[#B191FF] sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mt-5 animate-fade-right animate-twice"> Mechatronics 🤖</div>
            </div>
            <div className="absolute top-[70%] left-[50%] -translate-x-[50%] -translate-y-[50%] pointer-events-none">
                <Detail />
            </div>
        </div>
    );
};

const PointCircle = () => {
    const ref = useRef(null);

    useFrame(({ clock }) => {
        if (ref.current?.rotation) {
            ref.current.rotation.z = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <group ref={ ref }>
            { pointsInner.map((point) => (
                <Point key={ point.idx } position={ point.position } color={ point.color } />
            )) }
            { pointsOuter.map((point) => (
                <Point key={ point.idx } position={ point.position } color={ point.color } />
            )) }
        </group>
    );
};

const Point = ({ position, color }) => {
    return (
        <Sphere position={ position } args={ [0.1, 10, 10] }>
            <meshStandardMaterial
                emissive={ color }
                emissiveIntensity={ 0.5 }
                roughness={ 0.5 }
                color={ color }
            />
        </Sphere>
    );
};

export default ParticleRing;