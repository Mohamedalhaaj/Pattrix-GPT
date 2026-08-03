/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // AVIF first, WebP as the fallback. On the photography-led case-study and
    // service pages this is the largest byte saving available without touching
    // the source files — typically 25–40% under WebP at the same quality.
    formats: ["image/avif", "image/webp"]
  }
};

export default nextConfig;
