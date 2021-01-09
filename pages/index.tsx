import { GetServerSideProps } from "next";
import { userIsLogged } from "services/auth";
import { User, Jwt } from "types/user";

const Home = ({ user, jwt }: User & Jwt) => {
  return <pre>{JSON.stringify(user, null, 2)}</pre>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { user, jwt }: any = await userIsLogged(context);

  return {
    props: {
      user,
      jwt,
    },
  };
};

export default Home;
