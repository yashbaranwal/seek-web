"use client"

import { useState, useEffect } from "react";

interface DeviceType {
  isMobile: boolean;
  isDesktop: boolean;
}

interface WindowWithWidth extends Window {
  innerWidth: number;
}

const MOBILE_MAX_WIDTH = 767;
const DESKTOP_MIN_WIDTH = 768;

const useDeviceType = (): DeviceType => {
  const [isMobile, setIsMobile] = useState<boolean>(
    typeof window !== "undefined" ? (window as WindowWithWidth).innerWidth <= MOBILE_MAX_WIDTH : false,
  );
  const [isDesktop, setIsDesktop] = useState<boolean>(
    typeof window !== "undefined" ? (window as WindowWithWidth).innerWidth >= DESKTOP_MIN_WIDTH : false,
  );

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setIsMobile((window as WindowWithWidth).innerWidth <= MOBILE_MAX_WIDTH);
        setIsDesktop((window as WindowWithWidth).innerWidth >= DESKTOP_MIN_WIDTH);
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return { isMobile, isDesktop };
};

export default useDeviceType;
