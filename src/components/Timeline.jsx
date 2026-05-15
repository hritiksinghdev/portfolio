"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="c-space section-spacing" ref={containerRef}>
      <div className="flex flex-col items-center justify-center mb-10 text-center md:mb-20">
        <h2 className="text-heading">Experience</h2>
        <p className="mt-2 text-lg text-neutral-400 md:text-xl font-medium">Building systems, not just websites.</p>
      </div>
      <div ref={ref} className="relative pb-20 mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 lg:pt-32 md:gap-10 hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute -left-[15px] w-10 rounded-full bg-midnight flex items-center justify-center group-hover:bg-purple-500/20 transition-colors duration-300">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border dark:border-neutral-700 p-2 group-hover:border-purple-500 transition-colors duration-300" />
              </div>
              {/* Desktop View */}
              <div className="flex-col hidden gap-2 font-bold md:flex md:pl-20">
                <h3 className="text-xl md:text-2xl text-neutral-500">{item.date}</h3>
              </div>
            </div>

            {/* Content View */}
            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <div className="mb-6 text-left">
                <div className="block md:hidden mb-2">
                  <h3 className="text-lg font-bold text-neutral-500">{item.date}</h3>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold text-neutral-200">{item.title}</h3>
                <h4 className="text-xl md:text-2xl font-semibold text-purple-500 mt-1">{item.job}</h4>
              </div>

              {item.description && (
                <p className="mb-6 text-base md:text-lg text-neutral-300 leading-relaxed font-medium">
                  {item.description}
                </p>
              )}

              {item.contents && item.contents.length > 0 && (
                <ul className="list-disc list-inside space-y-2 marker:text-purple-500">
                  {item.contents.map((content, idx) => (
                    <li className="text-base text-neutral-400 leading-relaxed pl-1" key={idx}>
                      <span className="-ml-1">{content}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-1 left-1 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-lavender/50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
