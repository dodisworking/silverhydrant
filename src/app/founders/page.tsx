"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { StarsCanvas } from "@/components/stars/StarsCanvas";
import { FOUNDERS } from "@/lib/content/siteContent";
import styles from "./page.module.css";

export default function FoundersPage() {
  const router = useRouter();

  return (
    <div className={styles.page}>
      <StarsCanvas count={350} className={styles.stars} />

      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className={styles.logo}>Silver Hydrant</h1>

        <div className={styles.imageWrap}>
          <Image
            src="/founder.png"
            alt="Founders"
            width={600}
            height={800}
            className={styles.photo}
            priority
          />
        </div>

        <div className={styles.text}>
          <h2 className={styles.heading}>{FOUNDERS.heading}</h2>
          {FOUNDERS.paragraphs.map((p, i) => (
            <p key={i} className={styles.paragraph}>
              {p}
            </p>
          ))}
        </div>

        <div className={styles.brands}>
          <h3 className={styles.brandsHeading}>Brand Experience</h3>
          <p className={styles.brandsIntro}>
            {FOUNDERS.brandExperienceIntro}
          </p>
          <div className={styles.carouselWrap}>
            <div className={styles.carousel}>
              {/* Two copies for seamless infinite loop */}
              {[...FOUNDERS.brands, ...FOUNDERS.brands].map((brand, i) => (
                <div key={i} className={styles.brandChip}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className={styles.brandLogo}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className={styles.contactBtn}
          onClick={() => router.push("/contact")}
        >
          Contact
        </button>
      </motion.div>
    </div>
  );
}
