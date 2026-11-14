import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/work/building-once-ui-a-customizable-design-system",
        destination: "/work/glide-ski-tuning",
        permanent: true,
      },
      {
        source: "/work/simple-portfolio-builder",
        destination: "/work/brevium-enterprise-billing",
        permanent: true,
      },
    ];
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
