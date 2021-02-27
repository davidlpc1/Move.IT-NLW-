import Head from "next/head";
import { GetServerSideProps } from "next";

import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";
import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";
import ChallengeBox from "../components/ChallengeBox";

import styles from "../styles/pages/Home.module.css";
import { motion } from "framer-motion";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level:number ;
  currentExperience:number ;
  challengesCompleted:number ;
}

export default function Home(props:HomeProps) {
  const motionProps = {
    variants: {
      show: { opacity: 1, y: "0" },
      hidden: { opacity: 0, y: "100%" },
    },
    initial: "hidden",
    animate: "show",
  };

  return (
    <ChallengesProvider 
      level={props.level} 
      currentExperience={props.currentExperience} 
      challengesCompleted={props.challengesCompleted} 
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>

        <motion.div
          transition={{ delay: 0.5, duration: 0.75 }}
          {...motionProps}
        >
          <ExperienceBar />
        </motion.div>

        <CountdownProvider>
          <section>
            <motion.div
              transition={{ delay: 1, duration: 0.75 }}
              {...motionProps}
            >
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </motion.div>

            <motion.div
              transition={{ delay: 1.25, duration: 0.75 }}
              {...motionProps}
            >
              <ChallengeBox />
            </motion.div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience:Number(currentExperience),
      challengesCompleted:Number(challengesCompleted),
    },
  };
};