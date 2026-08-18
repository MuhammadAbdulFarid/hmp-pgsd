import os from "node:os";

/* =========================================================
   DETECT LOCAL IPV4
   ========================================================= */

function getLocalIPv4Addresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const networkInterface of Object.values(interfaces)) {
    if (!networkInterface) continue;

    for (const network of networkInterface) {
      if (network.family === "IPv4" && !network.internal && network.address) {
        addresses.push(network.address);
      }
    }
  }

  return [...new Set(addresses)];
}

const localIPs = getLocalIPv4Addresses();

/** @type {import("next").NextConfig} */
const nextConfig = {
  /* =======================================================
     DEVELOPMENT LAN ACCESS
     ======================================================= */

  allowedDevOrigins: ["localhost", "127.0.0.1", ...localIPs],

  /* =======================================================
     REMOTE IMAGES
     ======================================================= */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "voqsaswezrkhweozsarg.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/media/**",
      },
    ],
  },
};

export default nextConfig;
