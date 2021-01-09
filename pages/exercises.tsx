import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { userIsLogged } from "services/auth";
import { User, Jwt } from "types/user";
import axios from "axios";
import { ExercisesMuscleGroups } from "types/exercises";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const Home = ({
  user,
  jwt,
  exercisesMuscleGroups,
}: User & Jwt & ExercisesMuscleGroups) => {
  console.log(exercisesMuscleGroups);

  return <div>dsadas</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, jwt }: any = await userIsLogged(context);

  const Api_url = `${process.env.API_URL}exercises-muscle-groups` as string;

  const { data } = await axios.get(Api_url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return {
    props: {
      user,
      jwt,
      exercisesMuscleGroups: data,
    },
  };
};

export default Home;
