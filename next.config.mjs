const isGithubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isGithubPages ? "export" : undefined,
  trailingSlash: true,
  basePath: isGithubPages ? "/myrdamz_CARS-FOR-SALE-DAVAO" : "",
  assetPrefix: isGithubPages ? "/myrdamz_CARS-FOR-SALE-DAVAO/" : "",
  env: {
    NEXT_PUBLIC_GITHUB_PAGES: isGithubPages ? "true" : "false",
    NEXT_PUBLIC_BASE_PATH: isGithubPages ? "/myrdamz_CARS-FOR-SALE-DAVAO" : ""
  },
  images: {
    unoptimized: true
  }
};

export default nextConfig;
