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
      // A second Vercel project (logan-portfolio-five) deploys this same repo.
      // Send its visitors to the main URL so there's one canonical site.
      // Not permanent, so this is easy to reverse if the canonical URL changes.
      {
        source: "/:path*",
        has: [{ type: "host", value: "logan-portfolio-five.vercel.app" }],
        destination: "https://logan-portfolio-xzmm.vercel.app/:path*",
        permanent: false,
      },
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
